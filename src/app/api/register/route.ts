// app/api/register/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../../config/db'; // Ensure you have a database connection utility
import User from '../../../../models/Users';
import bcrypt from 'bcrypt'; // Library for hashing passwords

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, mobileNumber, address } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !mobileNumber || !address) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber,
      address,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message || 'Server Error' }, { status: 500 });
  }
}
