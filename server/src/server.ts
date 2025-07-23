import express, { Application, Request, Response } from "express";
import authRoutes from "../routes/authRoutes";
import cors from "cors";
import { connectDB } from "../config/db";
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Sample route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
