// models/user.model.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface for User
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: Date; // Add createdAt field
}

// User Schema
const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to current date
  },
});

// Export User model
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
