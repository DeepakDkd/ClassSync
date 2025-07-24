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
  public subject?: string[];
  public roomNumber?: string;
  public buildingName?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      batch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },

      roomNumber: {
        type: DataTypes.STRING,
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
  ClassRoom.hasMany(models.User, {
    foreignKey: "classRoomId",
    as: "students",
  });
};
export default ClassRoom;

