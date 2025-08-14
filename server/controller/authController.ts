import db from "../model";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { generateOtpEmail } from "../src/templates/emails/otp";
import { loginUser, registerUser } from "../services/authService";
import { generateOtp, generateSalt, hashOtp } from "../utils/otp";
import crypto from "crypto";

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
 

    const { email } = req.body;
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const otp = generateOtp();
    const salt = generateSalt();
    const otpHash = hashOtp(otp, salt);
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    console.log("ID:", crypto.randomUUID());
// return res.status(200).json(new ApiResponse(200, "Password reset OTP sent", { otp }));
    const passwordResetRequest = await db.PasswordResetRequest.create({
      id: crypto.randomUUID(),
      userId: user.id,
      otpHash,
      otpSalt: salt,
      otpExpiresAt,
      verified: false,
      used: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const { html, text } = generateOtpEmail(otp, 5, "ClassSync");

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      text,
      html,
    });
    res.status(200).json(new ApiResponse(200, "Password reset OTP sent", { resetRequestId: passwordResetRequest.id }));

  } catch (error: any) {
    console.error("Error during forgot password:", error);
    throw new ApiError(500, "Internal server error", [error.message || error]);

  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { resetRequestId, otp } = req.body;
    console.log("Reset Request ID:", resetRequestId);
    console.log("OTP:", otp);
    if (!resetRequestId || !otp) {
      throw new ApiError(400, "Reset request ID and OTP are required");
    }
    const reset = await db.PasswordResetRequest.findOne({ where: { id: resetRequestId } });
    if (!reset) {
      throw new ApiError(404, "Password reset request not found");
    }
    if (reset.otpHash !== hashOtp(otp, reset.otpSalt)) {
      throw new ApiError(400, "Invalid OTP");
    }
    if (reset.otpExpiresAt && reset.otpExpiresAt < new Date()) {
      throw new ApiError(400, "OTP has expired");
    }
    if (reset.verified) {
      throw new ApiError(400, "OTP has already been verified");
    }
    if (reset.used) {
      throw new ApiError(400, "OTP has already been used");
    }

    await db.PasswordResetRequest.update(
      { verified: true, updatedAt: new Date(), },
      { where: { id: resetRequestId } }
    );
    const user = await db.User.findOne({ where: { id: reset.userId } });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const payload = { userId: user.id, resetRequestId: reset.id };


    const secretKey = process.env.JWT_SECRET_RESET_PASSWORD;

    if (!secretKey) {
      throw new ApiError(500, "JWT secret key is not defined");
    }
    const resetToken = jwt.sign(payload, secretKey, { expiresIn: "5m" });

    res.status(200).json(new ApiResponse(200, "OTP verified successfully", { resetToken: resetToken }));

  } catch (error: any) {
    console.error("Error during OTP verification:", error);
    throw new ApiError(500, "Internal server error", [error.message || error]);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      throw new ApiError(400, "Reset token and new password are required");
    }
    const secretKey = process.env.JWT_SECRET_RESET_PASSWORD;
    if (!secretKey) {
      throw new ApiError(500, "JWT secret key is not defined");
    }
    const payload = jwt.verify(resetToken, secretKey) as { userId: string; resetRequestId: string };
    if (!payload || !payload.userId || !payload.resetRequestId) {
      throw new ApiError(400, "Invalid reset token");
    }
    const user = await db.User.findOne({ where: { id: payload.userId } });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const resetRequest = await db.PasswordResetRequest.findOne({ where: { id: payload.resetRequestId, userId: user.id } });
    if (!resetRequest) {
      throw new ApiError(404, "Password reset request not found");
    }
    if (!resetRequest.verified) {
      throw new ApiError(400, "OTP has not been verified");
    }
    if (resetRequest.used) {
      throw new ApiError(400, "Password reset request has already been used");
    }
    user.password = newPassword;
    await user.save();
    await db.PasswordResetRequest.update({
      used: true,
      updatedAt: new Date(),
    }, { where: { id: resetRequest.id } });
    res.status(200).json(new ApiResponse(200, "Password reset successfully"));

  } catch (error: any) {
    console.error("Error during reset password:", error);
    throw new ApiError(500, "Internal server error", [error.message || error]);
  }
};
