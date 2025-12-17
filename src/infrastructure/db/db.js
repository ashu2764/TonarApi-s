import mongoose from 'mongoose';

export const connectDB = async (MONGO_URI) => {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
}