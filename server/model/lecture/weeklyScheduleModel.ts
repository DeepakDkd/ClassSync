import { DataTypes, Model, Sequelize } from "sequelize";
import { IWeeklySchedule } from "../../types/lecture.d";

class WeeklySchedule extends Model<IWeeklySchedule> implements IWeeklySchedule {
    public id!: string;
    public name?: string;
    public mapping!: { [dayOfWeek: number]: string }; 
    public startDate!: string; 
    public endDate!: string; // YYYY-MM-DD format
    public courseId!: string;
    public specializationId?: string;
    public batchId!: string;
    public createdBy!: string;
    public createdAt!: Date;
    public updatedAt?: Date;
}
export default WeeklySchedule;


export const initWeeklyScheduleModel = (sequelize: Sequelize) => {
    WeeklySchedule.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            mapping: {
                type: DataTypes.JSONB, // Store dayOfWeek to classScheduleId mapping
                allowNull: false,
            },
            startDate: {
                type: DataTypes.STRING, // YYYY-MM-DD format
                allowNull: false,
            },
            endDate: {
                type: DataTypes.STRING, // YYYY-MM-DD format
                allowNull: false,
            },
            courseId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            specializationId: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            batchId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            
        },
        {
            sequelize,
            modelName: 'WeeklySchedule',
            tableName: 'weekly_schedules',
            timestamps: true,
        }
    );
    return WeeklySchedule;
};

export const associateWeeklyScheduleModel = (models: any) => {
    WeeklySchedule.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course',
    });
    WeeklySchedule.belongsTo(models.Specialization, {
        foreignKey: 'specializationId',
        as: 'specialization',
    });
    WeeklySchedule.belongsTo(models.Batch, {
        foreignKey: 'batchId',
        as: 'batch',
    });
};