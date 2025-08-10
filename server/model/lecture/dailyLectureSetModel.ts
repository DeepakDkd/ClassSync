import { DataTypes, Model, Sequelize } from "sequelize";
import { IDailyLectureSet } from "../../types/lecture";

class DailyLectureSet extends Model<IDailyLectureSet> implements IDailyLectureSet {
    public id!: string;
    public name?: string;
    public date?: string;
    public dayOfWeek?: number;
    public mode!: 'one-time' | 'weekly';
    public courseId!: string;
    public specializationId?: string;
    public batchId!: string;
    public lectureSnapshots!: Array<{
        id?: string;
        lectureName: string;
        subjectId?: string;
        teacherId?: string;
        classroomId?: string;
        startTime: string;
        endTime: string;
    }>;
    public createdBy!: string;
    public createdAt!: Date;
    public updatedAt?: Date;
}

export default DailyLectureSet;

export const initDailyLectureSetModel = (sequelize: Sequelize) => {
    DailyLectureSet.init(
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
            date: {
                type: DataTypes.STRING, // YYYY-MM-DD format
                allowNull: true,
            },
            dayOfWeek: {
                type: DataTypes.INTEGER, // 0-6 for Sunday-Saturday
                allowNull: true,
            },
            mode: {
                type: DataTypes.STRING,
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
            lectureSnapshots: {
                type: DataTypes.JSONB, // Store snapshots as JSON
                allowNull: false,
            },
            createdBy: {
                type: DataTypes.UUID,
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
            modelName: "DailyLectureSet",
            tableName: "daily_lecture_sets",
            timestamps: true,
        }
    );
    return DailyLectureSet;
};


export const associateDailyLectureSetModel = (models: any) => {
    DailyLectureSet.belongsTo(models.Course, {
        foreignKey: "courseId",
        as: "course",
    });
    DailyLectureSet.belongsTo(models.Specialization, {
        foreignKey: "specializationId",
        as: "specialization",
    });
    DailyLectureSet.belongsTo(models.Batch, {
        foreignKey: "batchId",
        as: "batch",
    });
};
