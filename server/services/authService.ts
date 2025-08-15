import db from "../model";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshTokens } from "../utils/jwt";
import { IUser, IUserInstance } from "../types/user";
import { sendEmail } from "../utils/email";
import { ApiError } from "../utils/ApiError";

export const registerUser = async (
  userData: IUser
): Promise<
  Omit<IUser, "password"> & { accessToken: string; refreshToken: string }
> => {
  try {
    const { email, password } = userData;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }
    const newUser = await db.User.create({
      ...userData,
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      newUser.id
    );
    const userJson = newUser.toJSON();
    const { password: _, ...safeUser } = userJson;
    return { ...safeUser, accessToken, refreshToken };
  } catch (error: any) {
    console.error("Registration error:", error);
    throw new ApiError(500, "Registration failed", [error.message || error]);
  }
};

export const loginUser = async (credentials: any): Promise<{
  user: IUserInstance ;
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const { email, password } = credentials;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await db.User.findOne({ where: { email } }) as IUserInstance;
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user.id
    );

    return {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    throw new ApiError(500, "Login failed", [error.message || error]);
  }
};
export const logoutUser = async (userId: string): Promise<void> => {
  try {
    // Handle user logout logic
  } catch (error: any) {
    console.error("Logout error:", error);
    throw new ApiError(500, "Logout failed", [error.message || error]);
  }
};
