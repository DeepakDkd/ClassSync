import e, { Request, response, Response } from "express";
import { forgotPasswordService, loginUser, registerUser } from "../services/authService";
import db from "../model";
import ApiResponse from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
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
      .json(new ApiResponse(200, "User registered successfully", safeUser));
  } catch (error: any) {
    console.error("Registration error:", error);
    throw new ApiError(500, "Internal server error", [error.message || error]);
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
      .json(new ApiResponse(200, "User logged in successfully", userWithoutPassword));
  } catch (error: any) {
    console.error("Login error:", error);
    throw new ApiError(500, "Internal server error", [error.message || error]);
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
      .json(new ApiResponse(200, "User logged out successfully"));
  } catch (error: any) {
    console.log("error during logout ", error);
    throw new ApiError(500, "Internal server error", [error.message || error]);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const user = await forgotPasswordService(req.body);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, "Password reset link sent", user)); 
  } catch (error: any) {
    console.error("Error during forgot password:", error);
    throw new ApiError(500, "Internal server error", [error.message || error]);

  }
};

export const verifyOtp = async (req: Request, res: Response) => {
    try {
      // Implement OTP verification logic
  } catch (error: any) {
    console.error("Error during OTP verification:", error);
    throw new ApiError(500, "Internal server error", [error.message || error]);
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    // Implement reset password logic
  } catch (error: any) {
    console.error("Error during reset password:", error);
    throw new ApiError(500, "Internal server error", [error.message || error]);
  }
};
