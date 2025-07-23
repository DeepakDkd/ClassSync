import { Model, DataTypes, Sequelize } from "sequelize";
import { IUser } from "../types/user";
import bcrypt from "bcrypt";

class User extends Model<IUser> implements IUser {
  public id!: string;
  public email!: string;
  public password!: string;
  public userName?: string;
  public firstName?: string;
  public lastName?: string;
  public name?: string;
  public role?: string;
  public classRoomId?: string;
  public classRoomName?: string;
  public lastLoginAt?: Date;
  public isActive?: boolean;
  public profilePictureUrl?: string;
  public bio?: string;
  public preferences?: Record<string, any>;
  public socialLinks?: Record<string, string>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "student",
      },
      classRoomId: {
        type: DataTypes.STRING,
      },
      classRoomName: {
        type: DataTypes.STRING,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      profilePictureUrl: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.TEXT,
      },
      preferences: {
        type: DataTypes.JSON, // use JSON instead of JSONB for MySQL
      },
      socialLinks: {
        type: DataTypes.JSON, // same here
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      hooks: {
        beforeCreate: async (user: IUser) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  return User;
};

export const associateUserModel = (models: any) => {
  User.belongsTo(models.ClassRoom, {
    foreignKey: "classRoomId",
    as: "classRoom",
  });
};
