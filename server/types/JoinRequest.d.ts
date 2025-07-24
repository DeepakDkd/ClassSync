export interface IJoinRequest {
  id: string;
  userId: string;
  classRoomId: string;
  email: string;
  classRoomName: string;
  message?: string;
  status: "pending" | "accepted" | "rejected";
}
