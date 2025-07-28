import { Request, Response } from "express";
import { getUserService } from "../services/userService";
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Invalid id",
      });
      return;
    }
    const user = await getUserService(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    const userData = user.toJSON();
    res.status(200).json({
      message: `User fetched successfully`,
      user: userData,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
