import { Request, Response } from "express";
import { getUserService } from "../services/userService";
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const id = req.params['id'];
    const id = req.query.id;
    if (!id) {
      throw new Error("Invalid id");
    }
    const user = await getUserService(id);
    res
      .status(200)
      .json({
        message: `User with ID ${id} fetched successfully`,
        user: user,
      });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
