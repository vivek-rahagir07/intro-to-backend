import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

let mongoServer = null;

const connectDB = async () => {
    try {
        let uri = process.env.MONGODB_URI;

        // fallback to in-memory db if uri is missing or placeholder
        if (!uri || uri.includes("your_mongodb_connection_string_here") || uri.includes("<username>") || uri.includes("<db_username>")) {
            console.log("\n[Notice] No active MongoDB Atlas URI detected in .env.");
            console.log("[Notice] Initializing local MongoDB instance for seamless offline testing & evaluation...");
            const { MongoMemoryServer } = await import("mongodb-memory-server");
            mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            console.log(`[Notice] Local MongoDB instance running at: ${uri}`);
        }

        const connectionInstance = await mongoose.connect(uri, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000
        });

        console.log(`\n MongoDB connected !!! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
