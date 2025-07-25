import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import db from "../model";
import { IUser } from "../types/user";

// Extend Express Request interface to include 'user'
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

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;

    if (accessToken) {
      const decode = verifyToken({
        token: accessToken,
        secretKey: accessTokenSecret,
      });

      if (!decode) {
        throw new Error("Unaurthorized access ");
      }
      const user = await db.User.findByPk(decode.id, {
        attributes: { exclude: ["password", "refreshToken"] },
      });

      req.user = user as IUser;
      next();
    }

    const refreshToken = req.cookies.refreshToken;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
    if (refreshToken) {
      const decode = verifyToken({
        token: refreshToken,
        secretKey: refreshTokenSecret,
      });

      if (!decode) {
        throw new Error("Unaurthorized access ");
      }
      const user = await db.User.findByPk(decode.id, {
        attributes: { exclude: ["password", "refreshToken"] },
      });

      req.user = user as IUser;
      next();
    }

    if (!refreshToken) {
      throw new Error("Token not found , Unaurthorized access");
    }
  } catch (error) {
    console.log("Failed to verify token", error);
  }
};
