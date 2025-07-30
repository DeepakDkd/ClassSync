export interface IClassSchedule {
    id: string;
    classScheduleName: string;
    description?: string;
    classType: string;
    batchId: string;
    classRoomId: string;
    startTime: Date;
    endTime: Date;
    isActive: boolean;
    date: Date;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}