import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json({ user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // Handle login logic
};
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.id;
    console.log(`Fetching user with ID: ${userId}`);
    try {
        // Fetch user by ID logic
        res.status(200).json({ message: `User with ID ${userId} fetched successfully` });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    }