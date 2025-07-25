import { Model, DataTypes, Sequelize, DataTypeAbstract } from "sequelize";
import { IUser } from "../types/user.d";
import bcrypt from "bcrypt";
import { sequelize } from "../config/db";


class User extends Model<IUser> implements IUser {
  public id!: string;
  public email!: string;
  public password!: string;
  // public userName?: string;
  public firstName?: string;
  public lastName?: string;
  public name?: string;
  public role?: string;
  public classRoomId?: string;
  public refreshToken?: string;
  public lastLoginAt?: Date;
  public isActive?: boolean;
  public profilePictureUrl?: string;
  public bio?: string;
  public preferences?: Record<string, any>;
  public socialLinks?: Record<string, string>;

  public async isValidPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
export default User;

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      // userName: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   unique: true,
      // },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "student",
      },
      classRoomId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      profilePictureUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      preferences: {
        type: DataTypes.JSON, // use JSON instead of JSONB for MySQL
        allowNull: true,
      },
      socialLinks: {
        type: DataTypes.JSON, // same here
        allowNull: true,
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
        beforeUpdate: async (user: User) => {
          if (user.changed("password") && user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );
  return User;
};

export const associateUserModel = (models: any) => {
  models.User.hasMany(models.JoinRequest, {
    foreignKey: "userId",
    as: "joinRequests",
    onDelete: "SET NULL",
  });

  models.User.hasMany(models.ClassRoom, {
    foreignKey: "createdBy",
    as: "creator",
  });

  models.User.belongsTo(models.ClassRoom, {
    foreignKey: "classRoomId",
    as: "joinedClass",
  });
};
