<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        // 1. Validate incoming data parameters
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'phone'   => 'nullable|string|max:50',
            'message' => 'required|string|max:5000',
        ]);

        // 2. Format a simple plain-text email message template body
        $emailBody = "New Lead Captured via Higrotek Sliding Contact Form:\n\n" .
                     "Full Name: {$validated['name']}\n" .
                     "Email: {$validated['email']}\n" .
                     "Company: " . ($validated['company'] ?? 'N/A') . "\n" .
                     "Phone: " . ($validated['phone'] ?? 'N/A') . "\n\n" .
                     "Project Scope Details / Message:\n" . $validated['message'];

        // 3. Dispatch the email using Laravel's Mail Facade
        Mail::raw($emailBody, function ($message) use ($validated) {
            $message->to('contact@higrotek.co.za') // Who receives the lead alerts
                    ->replyTo($validated['email'], $validated['name']) // Reply goes straight to client
                    ->subject('⚡ New Web Quote Request: ' . $validated['name']);
        });

        // 4. Return an Inertia back-response triggering the success modal state
        return back()->with('status', 'Thank you for your request!');
    }
}