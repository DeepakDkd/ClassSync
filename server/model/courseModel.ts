import { DataTypes, Model, Sequelize } from 'sequelize';
import { ICourse } from '../types/course.d';

class Course extends Model<ICourse> implements ICourse {
    public id!: string;
    public name!: string;
    public description?: string;
    public durationInYears?: number;
    public courseCode!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initCourseModel = (sequelize: Sequelize) => {
    Course.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            durationInYears: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            courseCode: {
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
            modelName: 'Course',
            tableName: 'courses',
            timestamps: true,
            underscored: true,
        }
    );
    return Course;
};

export const associateCourseModel = (models: any) => {
    Course.hasMany(models.Specialization, {
        foreignKey: 'courseId',
        as: 'specializations',
    });

};
export default Course;
