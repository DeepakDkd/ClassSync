import { Request, Response } from "express";
import { getUserService } from "../services/userService";
import asyncHandler from "../utils/asyncHandler";
export const getUserById = asyncHandler(async (
  req: Request,
  res: Response
): Promise<void> => {
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

});