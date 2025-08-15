import { DataTypes, Model, Sequelize } from 'sequelize'
import { IBatch } from '../types/batch.d'
import { sequelize } from "../config/db";

class Batch extends Model<IBatch> implements IBatch {
    public id!: string;
    public name!: string;
    public createdBy!: string;
    public isActive!: boolean;
    public description?: string;
    batchCode?: string | undefined;
    batchYear?: string | undefined;
    batchSemester?: string | undefined;
    public readonly createdAt?: Date | undefined;
    public readonly updatedAt?: Date | undefined;

}
export default Batch;

export const initBatchModel = (sequelize: Sequelize) => {
    Batch.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
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
        
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },
        {
            sequelize,
            modelName: "Batch",
            tableName: "batches",
            timestamps: true
        });
    return Batch;
};

export const associateBatchModel = (models: any) => {
    models.Batch.hasMany(models.JoinRequest, {
        foreignKey: "batchId",
        as: "joinRequests",
    })
    models.Batch.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "batchCreator"
    })
}