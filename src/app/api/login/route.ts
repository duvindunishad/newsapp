// app/api/login/route.ts

import dbConnect from '../../../../config/db';
import User from '../../../../models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dbConnect();

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(
                JSON.stringify({ message: 'Email and password are required' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 400,
                }
            );
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return new Response(
                JSON.stringify({ message: 'Invalid credentials' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 401,
                }
            );
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return new Response(
                JSON.stringify({ message: 'Invalid credentials' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 401,
                }
            );
        }

        // Create JWT and include user id
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        // Return the token and the user id
        return new Response(
            JSON.stringify({ token, userId: existingUser._id }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            }
        );
    } catch (error) {
        console.error('Error logging in user:', error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500,
            }
        );
    }
}
