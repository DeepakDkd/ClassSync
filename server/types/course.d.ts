export interface ICourse {
    id: string;
    name: string;
    description?: string;
    durationInYears?: number;
    createdAt: Date;
    updatedAt: Date;
}
