export type ClassType = 'theory' | 'practical' | 'seminar';
export interface IClassSchedule {
    id: string;
    classScheduleName: string;
    description?: string;
    classType: ClassType;
    batchId: string;
    classRoomId: string;
    lectures?: string[];
    startTime: Date;
    endTime: Date;
    date: Date;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}