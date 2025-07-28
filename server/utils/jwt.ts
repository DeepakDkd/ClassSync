import jwt from "jsonwebtoken";
import db from "../model";

export const generateAccessToken = (userId: string): string => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  const accessToken = jwt.sign({ userId }, secretKey, { expiresIn: "1d" });

  return accessToken;
};

export const generateRefreshToken = (userId: string): string => {
  const secretKey = process.env.REFRESH_TOKEN_SECRET;
  if (!secretKey) {
    throw new Error("JWT refresh secret key is not defined");
  }
  const refreshToken = jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
  return refreshToken;
};

export const verifyToken = ({
  token,
  secretKey,
}: {
  token: string;
  secretKey: string;
}) => {
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  console.log("Verifying token:", token);
  console.log("Using secret key:", secretKey);
  try {
    return jwt.verify(token, secretKey) as { userId: string };
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const generateAccessAndRefreshTokens = async (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  if (!accessToken || !refreshToken) {
    throw new Error("Failed to generate tokens");
  }
  await db.User.update(
    { refreshToken: refreshToken },
    { where: { id: userId } }
  );

  return { accessToken, refreshToken };
};
