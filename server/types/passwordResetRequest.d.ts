export interface IPasswordResetRequest {
    id: string;
    userId: string;
    otpHash: string;
    otpSalt: string;
    otpExpiresAt: Date | undefined;
    verified: boolean;
    used: boolean;
    createdAt: Date;
    updatedAt: Date;
}