import db from "../model";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshTokens } from "../utils/jwt";
import { IUser } from "../types/user";

export const registerUser = async (
  userData: IUser
): Promise<
  Omit<IUser, "password"> & { accessToken: string; refreshToken: string }
> => {
  try {
    const { email, password } = userData;
    if (!email || !password) {
      throw new Error("Email and password are required");
    } 
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
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
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Registration failed");
  }
};

export const loginUser = async (credentials: any): Promise<any> => {
  try {
    const { email, password } = credentials;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const { password: _, ...userWithoutPassword } = user.toJSON();

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user.id
    );

    return {
      user: userWithoutPassword,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed");
  }
};
export const logoutUser = async (userId: string): Promise<void> => {
  try {
    // Handle user logout logic
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Logout failed");
  }
};
