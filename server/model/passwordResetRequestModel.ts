import {DataTypes, Model} from 'sequelize';
import {IPasswordResetRequest} from '../types/passwordResetRequest';
class PasswordResetRequest extends Model<IPasswordResetRequest> {
    public id!: string;
    public userId!: string;
    public otpHash!: string;
    public otpSalt!: string;
    public otpExpiresAt!: Date;
    public verified!: boolean;
    public used!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
export default PasswordResetRequest;

export const initPasswordResetRequestModel = (sequelize: any) => {
  PasswordResetRequest.init(
    {
      id: {
        type: DataTypes. UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      otpHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        otpSalt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      otpExpiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: 'PasswordResetRequest',
      tableName: 'passwordResetRequests',
      timestamps: true,
    }
  );
  return PasswordResetRequest;
};