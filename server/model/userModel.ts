// import { Model, DataTypes, Sequelize } from "sequelize";
// import { IUser } from "../types/user.d";
// import bcrypt from "bcrypt";


// class User extends Model<IUser> implements IUser {
//   public id!: string;
//   public email!: string;
//   public password!: string;
//   public enrollment!: string;
//   // public userName?: string;
//   public firstName?: string;
//   public lastName?: string;
//   public name?: string;
//   public role?: string;
//   public batchId?: string;
//   public refreshToken?: string;
//   public lastLoginAt?: Date;
//   public status?: "active" | "suspended" | "pending" | "deleted" | "archived" | "inactive";
//   public profilePictureUrl?: string;
//   public bio?: string;
//   public preferences?: Record<string, any>;
//   public socialLinks?: Record<string, string>;

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   public async isValidPassword(password: string): Promise<boolean> {
//     return bcrypt.compare(password, this.password);
//   }
// }
// export default User;

// export const initUserModel = (sequelize: Sequelize) => {
//   User.init(
//     {
//       id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       enrollment: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       // userName: {
//       //   type: DataTypes.STRING,
//       //   allowNull: false,
//       //   unique: true,
//       // },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       batchId: {
//         type: DataTypes.UUID,
//         allowNull: true,
//       },
//       role: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       refreshToken: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       lastLoginAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//       profilePictureUrl: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       bio: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       preferences: {
//         type: DataTypes.JSON, // use JSON instead of JSONB for MySQL
//         allowNull: true,
//       },
//       socialLinks: {
//         type: DataTypes.JSON, // same here
//         allowNull: true,
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//     },
//     {
//       sequelize,
//       modelName: "User",
//       tableName: "users",
//       timestamps: true,
//       hooks: {
//         beforeCreate: async (user: IUser) => {
//           if (user.password) {
//             user.password = await bcrypt.hash(user.password, 10);
//           }
//         },
//         beforeUpdate: async (user: User) => {
//           if (user.changed("password") && user.password) {
//             user.password = await bcrypt.hash(user.password, 10);
//           }
//         },
//       },
//     }
//   );
//   return User;
// };

// export const associateUserModel = (models: any) => {
//   if (!models.JoinRequest || !models.ClassRoom || !models.ClassSchedule || !models.Lecture) {
//     throw new Error("Required models not found for User associations");
//   }
//   models.User.hasMany(models.JoinRequest, {
//     foreignKey: "studentId",
//     as: "joinRequests",
//     onDelete: "SET NULL",
//   });

//   models.User.hasMany(models.JoinRequest, {
//     foreignKey: "reviewedBy",
//     as: "reviewedRequests",
//     onDelete: "SET NULL",
//   });
//   models.User.hasMany(models.ClassRoom, {
//     foreignKey: "createdBy",
//     as: "creator",
//   });
//   models.User.hasMany(models.ClassSchedule, {
//     foreignKey: "createdBy",
//     as: "createdSchedules",
//   });
//   models.User.hasMany(models.ClassSchedule, {
//     foreignKey: "updatedBy",
//     as: "updatedSchedules",
//   });
//   models.User.hasMany(models.Lecture, {
//     foreignKey: "createdBy",
//     as: "lectures",
//   });
//   models.User.hasMany(models.Lecture, {
//     foreignKey: "updatedBy",
//     as: "updatedLectures",
//   });
// }

import { Model, DataTypes, Sequelize } from "sequelize";
import { IUser } from "../types/user.d";
import bcrypt from "bcrypt";

class User extends Model<IUser> implements IUser {
  public id!: string;
  public email!: string;
  public password!: string;
  public enrollment!: string;
  public firstName?: string;
  public lastName?: string;
  public role?: string;
  public batchId?: string;
  public refreshToken?: string;
  public lastLoginAt?: Date;
  public status?: "active" | "suspended" | "pending" | "deleted" | "archived" | "inactive";
  public profilePictureUrl?: string;
  public bio?: string;
  public preferences?: Record<string, any>;
  public socialLinks?: Record<string, string>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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
      enrollment: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      batchId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
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
      status: {
        type: DataTypes.ENUM(
          "active",
          "suspended",
          "pending",
          "deleted",
          "archived",
          "inactive"
        ),
        allowNull: false,
        defaultValue: "active",
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
        type: DataTypes.JSON,
        allowNull: true,
      },
      socialLinks: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      hooks: {
        beforeCreate: async (user: User) => {
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
  if (!models.JoinRequest || !models.ClassRoom || !models.ClassSchedule || !models.Lecture) {
    throw new Error("Required models not found for User associations");
  }
  models.User.hasMany(models.JoinRequest, {
    foreignKey: "studentId",
    as: "joinRequests",
    onDelete: "SET NULL",
  });
  models.User.hasMany(models.JoinRequest, {
    foreignKey: "reviewedBy",
    as: "reviewedRequests",
    onDelete: "SET NULL",
  });
  models.User.hasMany(models.ClassRoom, {
    foreignKey: "createdBy",
    as: "creator",
  });
  models.User.hasMany(models.ClassSchedule, {
    foreignKey: "createdBy",
    as: "createdSchedules",
  });
  models.User.hasMany(models.ClassSchedule, {
    foreignKey: "updatedBy",
    as: "updatedSchedules",
  });
  models.User.hasMany(models.Lecture, {
    foreignKey: "createdBy",
    as: "lectures",
  });
  models.User.hasMany(models.Lecture, {
    foreignKey: "updatedBy",
    as: "updatedLectures",
  });
};
