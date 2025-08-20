export interface IJoinRequest {
  id: string;
  batchId: string;
  studentId: string;
  courseId:string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
  respondedAt?: Date;
  reviewedBy?: string;      
  createdAt?: Date;
  updatedAt?: Date;
}
