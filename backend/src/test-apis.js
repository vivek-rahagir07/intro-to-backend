import connectDB from "./config/database.js";
import app from "./app.js";
import mongoose from "mongoose";

const PORT = 4099;

const runTests = async () => {
    console.log("==================================================");
    console.log("🧪 RUNNING AUTOMATED BACKEND API TESTS");
    console.log("==================================================");

    await connectDB();

    const server = app.listen(PORT, async () => {
        console.log(`[Test Server] Listening on http://localhost:${PORT}`);

        const baseUrl = `http://localhost:${PORT}`;
        let passed = 0;
        let failed = 0;

        const assert = (condition, testName) => {
            if (condition) {
                console.log(` ✅ PASS: ${testName}`);
                passed++;
            } else {
                console.error(` ❌ FAIL: ${testName}`);
                failed++;
            }
        };

        try {
            // 1. Root route
            const rootRes = await fetch(`${baseUrl}/`);
            const rootData = await rootRes.json();
            assert(rootRes.status === 200 && rootData.success, "Root welcome / health endpoint");

            // 2. User Registration
            const testEmail = `testuser_${Date.now()}@example.com`;
            const regRes = await fetch(`${baseUrl}/api/v1/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: "tester123",
                    email: testEmail,
                    password: "password123"
                })
            });
            const regData = await regRes.json();
            assert(regRes.status === 201 && regData.user?.email === testEmail, "POST /api/v1/users/register - Register User");

            // 3. User Registration Duplicate Check
            const dupRes = await fetch(`${baseUrl}/api/v1/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: "tester123",
                    email: testEmail,
                    password: "password123"
                })
            });
            assert(dupRes.status === 400, "POST /api/v1/users/register - Rejects Duplicate Email");

            // 4. User Login Success
            const loginRes = await fetch(`${baseUrl}/api/v1/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: testEmail,
                    password: "password123"
                })
            });
            const loginData = await loginRes.json();
            assert(loginRes.status === 200 && loginData.user?.username === "tester123", "POST /api/v1/users/login - Valid Credentials");

            // 5. User Login Invalid Password
            const invalidLoginRes = await fetch(`${baseUrl}/api/v1/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: testEmail,
                    password: "wrongpassword"
                })
            });
            assert(invalidLoginRes.status === 400, "POST /api/v1/users/login - Rejects Invalid Credentials");

            // 6. User Logout
            const logoutRes = await fetch(`${baseUrl}/api/v1/users/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: testEmail
                })
            });
            assert(logoutRes.status === 200, "POST /api/v1/users/logout - Logout Successful");

            // 7. Create Post
            const createPostRes = await fetch(`${baseUrl}/api/v1/posts/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Sample Post",
                    description: "This is a test post for the backend tutorial",
                    age: 25
                })
            });
            const createPostData = await createPostRes.json();
            const postId = createPostData.post?._id;
            assert(createPostRes.status === 201 && postId, "POST /api/v1/posts/create - Create Post");

            // 8. Get All Posts
            const getPostsRes = await fetch(`${baseUrl}/api/v1/posts/getPosts`);
            const postsData = await getPostsRes.json();
            assert(getPostsRes.status === 200 && Array.isArray(postsData) && postsData.length > 0, "GET /api/v1/posts/getPosts - Read All Posts");

            // 9. Update Post
            const updatePostRes = await fetch(`${baseUrl}/api/v1/posts/update/${postId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description: "Updated post description content"
                })
            });
            const updatePostData = await updatePostRes.json();
            assert(updatePostRes.status === 200 && updatePostData.post?.description === "Updated post description content", "PATCH /api/v1/posts/update/:id - Update Post");

            // 10. Delete Post
            const deletePostRes = await fetch(`${baseUrl}/api/v1/posts/delete/${postId}`, {
                method: "DELETE"
            });
            assert(deletePostRes.status === 200, "DELETE /api/v1/posts/delete/:id - Delete Post");

            // Summary
            console.log("==================================================");
            console.log(`🏁 TEST RESULTS: ${passed} Passed, ${failed} Failed`);
            console.log("==================================================");

            server.close(async () => {
                await mongoose.disconnect();
                process.exit(failed > 0 ? 1 : 0);
            });
        } catch (err) {
            console.error("Test execution failed with error:", err);
            server.close(async () => {
                await mongoose.disconnect();
                process.exit(1);
            });
        }
    });
};

runTests();
