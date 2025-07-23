import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string): string => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  return jwt.sign({ userId }, secretKey, { expiresIn: "1d" });
};

export const generateRefreshToken = (userId: string): string => {
  const secretKey = process.env.REFRESH_TOKEN_SECRET;
  if (!secretKey) {
    throw new Error("JWT refresh secret key is not defined");
  }
  return jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
};

export const verifyToken = ({ token, secretKey }: { token: string; secretKey: string }) => {
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const generateAccessAndRefreshTokens = (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
    if (!accessToken || !refreshToken) {
        throw new Error("Failed to generate tokens");
    }
    
  return { accessToken, refreshToken };
}
