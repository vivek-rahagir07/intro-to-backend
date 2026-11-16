import express from "express";
import cors from "cors";

const app = express(); // create an express app

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes import
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

// health check / welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Intro to Backend Web Development API is running!",
        version: "1.0.0",
        endpoints: {
            users: "/api/v1/users (POST /register, POST /login, POST /logout)",
            posts: "/api/v1/posts (POST /create, GET /getPosts, PATCH /update/:id, DELETE /delete/:id)"
        }
    });
});

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

export default app;
