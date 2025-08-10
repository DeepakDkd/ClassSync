import {DataTypes, Model, Sequelize} from 'sequelize';
import {sequelize} from '../config/db';
import {ClassType, IClassSchedule} from '../types/classSchedule.d'
class ClassSchedule extends Model<IClassSchedule> implements IClassSchedule {
    public id!: string;
    public classScheduleName!: string;
    public description?: string;
    public classType!: ClassType;
    public batchId!: string;
    public classRoomId!: string;
    public weeklyScheduleId!: string;
    public startTime!: Date;
    public endTime!: Date;
    public isActive!: boolean;
    public date!: Date;
    public createdBy!: string;
    public updatedBy!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default ClassSchedule;

export const initClassScheduleModel = (sequelize: Sequelize) => {
    ClassSchedule.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            classScheduleName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            classType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            batchId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            classRoomId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            weeklyScheduleId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            startTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            endTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            createdBy: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            updatedBy: {
                type: DataTypes.UUID,
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
            modelName: 'ClassSchedule',
            tableName: 'class_schedules',
            timestamps: true,
        }
    );
    return ClassSchedule;
};

export function associateClassScheduleModel(models: any) {
    models.ClassSchedule.belongsTo(models.Batch, {
        foreignKey: 'batchId',
        as: 'batch',
    });
    models.ClassSchedule.belongsTo(models.ClassRoom, {
        foreignKey: 'classRoomId',
        as: 'classRoom',
    });
    models.ClassSchedule.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator',
    });
    models.ClassSchedule.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updater',
    });
}