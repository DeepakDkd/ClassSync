import { DataTypes, Model, Sequelize } from "sequelize";
import { IJoinRequest } from "../types/JoinRequest.d";

class JoinRequest extends Model<IJoinRequest> implements IJoinRequest {
  public id!: string;
  public batchId!: string;
  public studentId!: string;
  public status!: 'pending' | 'approved' | 'rejected';
  public requestedAt!: Date;
  public respondedAt?: Date;
  public reviewedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default JoinRequest;

export const initJoinRequestModel = (sequelize: Sequelize) => {
  JoinRequest.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      batchId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      requestedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:DataTypes.NOW
      },
      respondedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      reviewedBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "JoinRequest",
      tableName: "joinRequests",
      timestamps: true,
    }
  );
  return JoinRequest;
};

export const associateJoinRequestModel = (models: any) => {
  if (!models.User || !models.Batch) {
    throw new Error("Required models not found for JoinRequest associations");
  }

  models.JoinRequest.belongsTo(models.User, {
    foreignKey: "studentId",
    as: "student",
    onDelete: "SET NULL",
  });

  models.JoinRequest.belongsTo(models.Batch, {
    foreignKey: "batchId",
    as: "batch",
    onDelete: "CASCADE",
  });

  models.JoinRequest.belongsTo(models.User, {
    foreignKey: "reviewedBy",
    as: "reviewer",
    onDelete: "SET NULL",
  });
};

