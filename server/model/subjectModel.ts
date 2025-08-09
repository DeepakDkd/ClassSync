import { DataTypes,Model ,Sequelize } from "sequelize";
import {ISubject} from "../types/subject.d";

class Subject extends Model<ISubject> implements ISubject {
    public id!: string;
    public name!: string;
    public description!: string;
    public courseId!: string;
    public specializationId?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initSubjectModel = (sequelize: Sequelize) => {
    Subject.init(
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
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            courseId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            specializationId: {
                type: DataTypes.UUID,
                allowNull: true,
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
            modelName: 'Subject',
            tableName: 'subjects',
            timestamps: true,
        }
    );
    return Subject;
};

export const associateSubjectModel = (models: any) => {
    Subject.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course',
    });
    Subject.belongsTo(models.Specialization, {
        foreignKey: 'specializationId',
        as: 'specialization',
    });
};

export default Subject;
