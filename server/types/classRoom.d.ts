export interface IClassRoom {
  id: string;
  name: string;
  createdBy: string;
  isActive?: boolean;
  description?: string;
  roomNumber?: string;
  buildingName?: string;
  capacity?: number;
  isAloted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
