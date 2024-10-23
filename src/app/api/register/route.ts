import dbConnect from "../../../../config/db"; // Connect to the database
import User from "../../../../models/Users"; // Import the User model
import bcrypt from "bcrypt"; // For password hashing
import jwt from 'jsonwebtoken'; // For JWT token creation

// Establish a database connection
dbConnect();

// Handle POST requests for user registration
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

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already exists' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 409, // Conflict
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User instance and save it to the database
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Create a JWT token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        return new Response(JSON.stringify({ token }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201, // Created
        });
    } catch (error: unknown) {
        console.error('Error registering user:', error); // Log the error for debugging

        // Handle validation errors
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

// Optionally, handle GET requests (not typical for a registration endpoint)
export async function GET() {
    return new Response(JSON.stringify({ message: 'Use POST to register a user.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 405, // Method Not Allowed
    });
}
