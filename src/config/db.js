import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';
const connectDB = async () => {
const uri = process.env.MONGO_URI;
if (!uri) throw new Error('MONGO_URI not set in env');
try {
    await mongoose.connect(uri, {
    // mongoose v7 uses unified defaults; keep options minimal
    serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected');
} catch (error) {
    console.log({error});
    throw new AppError("Database NOT Responding",404)
}

};
export default connectDB;