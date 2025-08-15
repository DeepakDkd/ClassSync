export interface IBatch {
    id: string;
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    createdBy: string;
    isActive?: boolean;
    subjectIds?: string[];
    batchCode?: string; 
    batchYear?: string;
    batchSemester?: string;
    preferences?: Record<string, any>;
    additionalInfo?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBatchStudent {
  id: string;
  batchId: string;
  studentId: string;
  joinedAt: Date;
  isActive: boolean;          
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IBatchTeacher {
  id: string;
  batchId: string;
  teacherId: string;
  assignedAt: Date;
  role?: 'mentor' | 'subject-teacher' | 'assistant';  // Optional role
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IBatchSubject {
  id: string;
  batchId: string;
  subjectId: string;
  assignedBy: string;         // Admin/teacher who assigned the subject
  assignedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
