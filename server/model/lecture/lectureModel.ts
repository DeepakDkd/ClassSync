import { DataTypes, Model, Sequelize } from "sequelize";
import { IDailyLectureSet, ILecture, LectureType } from "../../types/lecture";


class Lecture extends Model<ILecture> implements ILecture {
    public id!: string;
    public lectureName!: string;
    public description?: string;
    // public courseId!: string;
    // public specializationId?: string;
    public lectureType!: LectureType;
    public subject!: string;
    public teachers?: string[];
    public lectureImage?: string;
    public lectureVideoUrl?: string;
    public classRoomId!: string;
    public startTime!: Date;
    public endTime!: Date;
    public isActive!: boolean;
    // public date!: Date;
    public createdBy!: string;
    public updatedBy!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
export default Lecture;

export const initLectureModel = (sequelize: Sequelize) => {
    Lecture.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            lectureName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // courseId: {
            //     type: DataTypes.UUID,
            //     allowNull: false,
            // },
            // specializationId: {
            //     type: DataTypes.UUID,
            //     allowNull: true,
            // },
            lectureType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            teachers: {
                type: DataTypes.ARRAY(DataTypes.UUID),
                allowNull: true,
            },
            lectureImage: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lectureVideoUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            classRoomId: {
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
                allowNull: false,
            },
            // date: {
            //     type: DataTypes.DATE,
            //     allowNull: false,
            // },
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
            modelName: "Lecture",
            tableName: "lectures",
            timestamps: true,
            underscored: true,
        }
    );
    return Lecture;
};



export const associateLectureModel = (models: any) => {
    Lecture.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "creator",
    });
    Lecture.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updater",
    });
    // Lecture.belongsToMany(models.ClassSchedule, {
    //     through: models.LectureClassSchedule,
    //     foreignKey: "lectureId",
    //     otherKey: "classScheduleId",
    //     as: "classSchedules",
    // });
}


