// src/app/api/login/route.ts
import dbConnect from "../../../../config/db"; // Connect to the database
import User from "../../../../models/Users"; // Import the User model
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Establish a database connection
dbConnect();

// Handle POST requests for user login
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json(); // Parse JSON from the request body

        // Basic validation
        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Email and password are required' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400, // Bad request
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 401, // Unauthorized
            });
        }

        // Compare the password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 401, // Unauthorized
            });
        }

        // Optionally, you could create a token here (e.g., JWT) to return to the client

        return new Response(JSON.stringify({ message: 'Login successful', user }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200, // OK
        });
    } catch (error: unknown) {
        console.error('Error logging in user:', error); // Log the error for debugging
        
        // Handle unexpected errors
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: 'Server error', details: error.message }), {
                headers: { 'Content-Type': 'application/json' },
                status: 500, // Internal server error
            });
        }

        return new Response(JSON.stringify({ message: 'Unexpected error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}

// Optionally, handle GET requests (not typical for a login endpoint)
export async function GET() {
    return new Response(JSON.stringify({ message: 'Use POST to log in a user.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 405, // Method Not Allowed
    });
}
