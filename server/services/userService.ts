import db from "../model";
import { IUser } from "../types/user";

export const getUserService = async (id: any): Promise<any> => {
  try {
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ["password", "refreshToken"] },
    });

    if (!user) {
      throw new Error("user not found ");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("User not found");
  }
};

export const updateUser = async (userId: string, updateData: Partial<IUser>) => {
  try {
    const user = await db.User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await user.update(updateData);
    
    const { password, ...safeUser } = user.toJSON();
    return safeUser;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};