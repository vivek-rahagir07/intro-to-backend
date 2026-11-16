import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        console.log("Starting server...");
        console.log("MONGODB_URI configured:", process.env.MONGODB_URI ? "Yes" : "No");

        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
        });

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`\n🚀 Server is running at port : ${PORT}`);
            console.log(`👉 http://localhost:${PORT}/\n`);
        });
    } catch (err) {
        console.log("MONGO db connection failed !!! ", err);
        process.exit(1);
    }
};

startServer();
