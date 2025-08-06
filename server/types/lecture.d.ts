export interface ILecture {
    id: string;
    lectureName: string;
    description?: string;
    lectureType: string;
    subjects?: string[];
    lectureImage?: string;
    startTime: Date;
    endTime: Date;
    isActive: boolean;
    date: Date;
    createdBy: string;
    updatedBy?: string;
    createdAt: Date;
    updatedAt?: Date;
}