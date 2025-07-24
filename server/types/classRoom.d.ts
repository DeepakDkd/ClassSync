export interface IClassRoom {
  id: string;
  name: string;
  createdBy: string;
  isActive?: boolean;
  description?: string;
  batch: string;
  subject?: string[];
  roomNumber?: string;
  buildingName?: string;
  createdAt: Date;
  updatedAt: Date;
}
