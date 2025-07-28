import { IClassRoom } from "../types/classRoom";
import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/db";
class ClassRoom extends Model<IClassRoom> implements IClassRoom {
  public id!: string;
  public name!: string;
  public createdBy!: string;
  public isActive?: boolean;
  public description?: string;
  public batch!: string;
  public roomNumber?: string;
  public buildingName?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export default ClassRoom;

export const initClassRoomModel = (sequelize: Sequelize) => {
  ClassRoom.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      batch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      buildingName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ClassRoom",
      tableName: "classrooms",
      timestamps: true,
    }
  );
  return ClassRoom;
};

export const associateClassRoomModel = (models: any) => {
  models.ClassRoom.hasMany(models.JoinRequest, {
    foreignKey: "classRoomId",
    as: "joinRequests",
  });

  models.ClassRoom.belongsTo(models.User, {
    foreignKey: "createdBy",
    as: "creator",
  });
};
