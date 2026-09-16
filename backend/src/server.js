const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

app.get("/", (req, res) => {
    res.json({
        application: "TaskFlow",
        message: "TaskFlow API is running"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy"
    });
});

app.get("/db-health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            status: "healthy",
            database: "connected"
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);

        res.status(500).json({
            status: "unhealthy",
            database: "disconnected"
        });
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch tasks:", error.message);

        res.status(500).json({
            error: "Failed to fetch tasks"
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`TaskFlow API listening on port ${PORT}`);
});
