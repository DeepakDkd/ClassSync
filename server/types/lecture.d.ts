export interface ILecture {
    id: string;
    lectureName: string;
    courseId: string;
    specializationId?: string;
    description?: string;
    lectureType: string;
    subject?: string;
    teachers?: string[];
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
