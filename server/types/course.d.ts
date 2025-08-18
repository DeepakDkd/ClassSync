export interface ICourse {
    id: string;
    name: string;
    description?: string;
    durationInYears?: number;
    language?: string;
    thumbnail?: string;
    bannerImage?: string;
    courseCode:string;
    createdAt: Date;
    updatedAt: Date;
}
