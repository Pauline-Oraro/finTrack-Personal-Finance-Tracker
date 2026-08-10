import express, { Application } from "express";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";

const app: Application = express();
const PORT = 5000;

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
    console.log(`Server is running onnnn http://localhost:${PORT}`);
});