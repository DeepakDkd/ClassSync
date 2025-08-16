import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/authRoutes";
import userRoutes from "../routes/userRoutes";
import batchRoutes from "../routes/batchRoutes";
import courseRoutes from "../routes/courseRoutes";
import { connectDB } from "../config/db";
import morgan from "morgan";

const app: Application = express();
const PORT = process.env.PORT || 5432;

// Connect to Database
connectDB();

// Global Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/batch", batchRoutes);
app.use("/api/course", courseRoutes);



// error handling middleware
import { errorHandler } from "../middleware/errorHandler";
app.use(errorHandler);

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
