// export interface IUser {
//   id: string;
//   email: string;
//   enrollment: string;
//   password: string;
//   firstName?: string;
//   lastName?: string;
//   batchId?: string;

//   admissionDate?: Date;
//   graduationDate?: Date;

//   father?: string;
//   mother?: string;
//   address?: string;
//   phone?: string;
//   phone2?: string;



//   refreshToken?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   role?: string; // e.g., 'student', 'admin','teacher'
//   lastLoginAt?: Date;
//   isActive?: boolean;
//   profilePictureUrl?: string;
//   bio?: string;
//   preferences?: Record<string, any>; // User-specific preferences or settings
//   socialLinks?: Record<string, string>;

//   createdAt: Date;
//   updatedAt: Date;
// }
export interface IUser {
  // ───────────────────────────
  // Core Identification
  // ───────────────────────────
  id: string;
  email: string;
  enrollment: string; // student/employee ID
  password: string;

  // ───────────────────────────
  // Personal Info
  // ───────────────────────────
  firstName?: string;
  lastName?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  dateOfBirth?: Date | string;
  address?: string;
  father?: string;
  mother?: string;
  phone?: string;
  phone2?: string;

  // ───────────────────────────
  // Academic / Organizational
  // ───────────────────────────
  batchId?: string;
  department?: string;
  admissionDate?: Date | string;
  graduationDate?: Date | string;
  courseIds?: string[]; // enrolled courses
  mentorId?: string; // teacher or mentor ID
  grades?: Record<string, string | number>; // { courseId: grade }
  attendancePercentage?: number;

  // ───────────────────────────
  // Authentication & Security
  // ───────────────────────────
  refreshToken?: string;
  failedLoginAttempts?: number;
  lastPasswordChangeAt?: Date | string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  loginIP?: string;
  loginLocation?: string;
  loginDevice?: string;
  accountLockedUntil?: Date | string;

  // ───────────────────────────
  // Roles & Permissions
  // ───────────────────────────
  role?: "student" | "teacher" | "admin" | string;
  permissions?: string[]; // fine-grained permissions
  groups?: string[]; // user groups or memberships
  status?: "active" | "suspended" | "pending" | "deleted" | "archived" | "inactive";

  // ───────────────────────────
  // Profile & Preferences
  // ───────────────────────────
  profilePictureUrl?: string;
  coverPhotoUrl?: string;
  bio?: string;
  language?: string;
  timezone?: string;
  theme?: "light" | "dark" | "system";
  tags?: string[];
  preferences?: Record<string, any>;
  socialLinks?: Record<string, string>; // { platform: url }

  // ───────────────────────────
  // Activity Tracking
  // ───────────────────────────
  lastLoginAt?: Date | string;
  lastActivityAt?: Date | string;
  signupIP?: string;
  signupMethod?: "email" | "google" | "facebook" | "apple" | string;
  devices?: Array<{ deviceId: string; deviceType: string; lastUsedAt: Date | string }>;
  activityLog?: Array<{ action: string; timestamp: Date | string; ip?: string }>;

  // ───────────────────────────
  // System Metadata
  // ───────────────────────────
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type IUserInstance = IUser & Model<IUser>;