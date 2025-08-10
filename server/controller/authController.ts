import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
import db from "../model";
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body);
    const { accessToken, refreshToken, ...safeUser } = user;
    res
      .status(200)
      .cookie("accessToken", user.accessToken, {
        httpOnly: true,
        sameSite: true,
      })
      .cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        sameSite: true,
      })
      .json({
        message: "User created successfully",
        success: true,
        user: safeUser,
      });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accessToken, refreshToken, userWithoutPassword } = await loginUser(
      req.body
    );
    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: true,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: true,
      })
      .json({ message: "user logged in successfully", userWithoutPassword });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error",error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await db.User.update(
      { refreshToken: undefined },
      { where: { id: req.body.id } }
    );
    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json("logged out successfully");
  } catch (error) {
    console.log("error during logout ", error);
  }
};