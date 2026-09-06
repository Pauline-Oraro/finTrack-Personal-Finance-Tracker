import express, { Application } from "express";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import connectDB from "./config/db";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// database connection
connectDB();

app.use(express.json());

// Expenses routes
app.use("/api/expenses", expenseRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

// Profile routes
app.use("/api/profile", profileRoutes);

// Analytics routes
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("FinTrack ~ An expense tracking application.");

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});