export interface ISubject {
    id: string;
    name: string;
    description: string;
    courseId: string;
    specializationId?: string;
    createdAt: Date;
    updatedAt: Date;
}