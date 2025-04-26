require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
connectDB();  // Connect to MongoDB

app.use(express.json());
app.use(cors({ origin: "https://adeshmishra-todo-jadu.onrender.com/", credentials: true }));

app.use("/api/items", itemRoutes);  // Base API route

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API. Use /api/items" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
