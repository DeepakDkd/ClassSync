import { DataTypes, Model, Sequelize } from "sequelize";
import { IJoinRequest } from "../types/JoinRequest.d";

class JoinRequest extends Model<IJoinRequest> implements IJoinRequest {
  public id!: string;
  public userId!: string;
  public classRoomId!: string;
  public email!: string;
  public classRoomName!: string;
  public message?: string;
  public status!: "pending" | "accepted" | "rejected";
}
export const initJoinRequestModel = (sequelize: Sequelize) => {
  JoinRequest.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      classRoomId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      classRoomName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "JoinRequest",
      tableName: "joinRequests",
      timestamps: true,
    }
  );
};
export const associateJoinRequestModel = (db: any) => {
  db.JoinRequest.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
  });
  db.JoinRequest.belongsTo(db.ClassRoom, {
    foreignKey: "classRoomId",
    as: "classRoom",
  });
};
