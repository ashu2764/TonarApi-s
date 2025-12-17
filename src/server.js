import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './infrastructure/db/db.js';


const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const stratserver = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);

    }
}

stratserver(); 