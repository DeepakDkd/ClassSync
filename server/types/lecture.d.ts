export type LectureType = 'theory' | 'practical' | 'seminar';
export interface ILecture {
  id: string;
  lectureName: string;
  description?: string;
  lectureType: LectureType;
  subject: string;
  teachers?: string[];
  lectureImage?: string;
  lectureVideoUrl?: string;
  classRoomId: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IDailyLectureSet {
  id: string;
  name?: string;
  date?: string;                // For one-time schedules (YYYY-MM-DD)
  dayOfWeek?: number;           // For mapping in a weekly schedule
  mode: 'one-time' | 'weekly';
  
  // If this daily set is tied to a specific batch/course
  courseId: string;
  specializationId?: string;
  batchId?: string;

  lectureSnapshots: Array<{
    id?: string;                 // Link to ILecture if needed
    lectureName: string;         // Snapshot name
    subjectId?: string;
    teacherId?: string;
    classroomId?: string;
    startTime: string;
    endTime: string;
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

  startDate: string;  
  endDate: string;    

  courseId: string;
  specializationId?: string;
  batchId: string;

  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}
