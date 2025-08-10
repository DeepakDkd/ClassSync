export interface ILecture {
    id: string;
    lectureName: string;
    description?: string;
    // courseId: string;
    // specializationId?: string;
    lectureType: string;
    subject?: string;
    teachers?: string[];
    lectureImage?: string;
    lectureVideoUrl?: string;
    classRoomId: string;
    startTime: Date;
    endTime: Date;
    isActive: boolean;
    // date: Date;
    createdBy: string;
    updatedBy?: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface IDailyLectureSet {
    id: string;
    name?: string;
    date?: string;                // DATEONLY: 'YYYY-MM-DD' for one-time plans (nullable)
    dayOfWeek?: number;           // 0..6 for weekly templates (nullable)
    mode: 'one-time' | 'weekly';
    lectureSnapshots: Array<{
        id?: string;
        lectureName: string;
        subjectId?: string;
        teacherId?: string;
        classroomId?: string;
        startTime: string;          // '07:30' (TIME) or ISO time part
        endTime: string;            // '08:15'

    }>;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface IWeeklySchedule {
    id: string;
    name?: string;
    mapping: {
        [dayOfWeek: number]: string;
    };
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}