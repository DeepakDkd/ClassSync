import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import db from "../model";
import { IUser } from "../types/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No tokens provided"
      });
    }

    if (accessToken) {
      try {
        const decode = verifyToken({
          token: accessToken,
          secretKey: process.env.ACCESS_TOKEN_SECRET!
        });

        const user = await db.User.findByPk(decode.userId, {
          attributes: { exclude: ["password", "refreshToken"] }
        });

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User not found"
          });
        }

        req.user = user as IUser;
        return next();
      } catch (error) {
        console.log("Access token verification failed, trying refresh token");
      }
    }

    if (refreshToken) {
      try {
        const decode = verifyToken({
          token: refreshToken,
          secretKey: process.env.REFRESH_TOKEN_SECRET!
        });

        const user = await db.User.findByPk(decode.userId, {
          attributes: { exclude: ["password", "refreshToken"] }
        });

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User not found"
          });
        }

        req.user = user as IUser;
        return next();
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token"
        });
      }
    }

  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};