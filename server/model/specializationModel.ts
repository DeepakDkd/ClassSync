import { DataTypes, Model, Sequelize } from "sequelize";
import { ISpecialization } from "../types/specialization.d";

class Specialization extends Model<ISpecialization> implements ISpecialization {
    public id!: string;
    public name!: string;
    public description?: string;
    public specializationCode!: string;
    public courseId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initSpecializationModel = (sequelize: Sequelize) => {
    Specialization.init(
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
            specializationCode: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            courseId: {
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
            modelName: 'Specialization',
            tableName: 'specializations',
            timestamps: true,
            underscored: true,
        }
    );
    return Specialization;
};

export const associateSpecializationModel = (models: any) => {
    Specialization.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course',
    });

};
export default Specialization;