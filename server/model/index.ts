import { sequelize } from "../config/db";
import { associateUserModel, initUserModel } from "./userModel";
import { initBatchModel, associateBatchModel } from './batchModel'
import { initCourseModel, associateCourseModel } from "./courseModel";
import { initSubjectModel, associateSubjectModel } from "./subjectModel";
import { initPasswordResetRequestModel } from './passwordResetRequestModel';
import { associateClassRoomModel, initClassRoomModel } from "./classRoomModel";
import { initLectureModel, associateLectureModel } from "./lecture/lectureModel";
import { associateJoinRequestModel, initJoinRequestModel } from "./joinRequestModel";
import { initClassScheduleModel, associateClassScheduleModel } from './classSchedule';
import { initSpecializationModel, associateSpecializationModel } from './specializationModel';
import { initWeeklyScheduleModel, associateWeeklyScheduleModel } from './lecture/weeklyScheduleModel';
import { associateDailyLectureSetModel, initDailyLectureSetModel } from './lecture/dailyLectureSetModel';

const db = {
  sequelize,
  User: initUserModel(sequelize),
  Batch: initBatchModel(sequelize),
  Course: initCourseModel(sequelize),
  Lecture: initLectureModel(sequelize),
  Subject: initSubjectModel(sequelize),
  ClassRoom: initClassRoomModel(sequelize),
  JoinRequest: initJoinRequestModel(sequelize),
  ClassSchedule: initClassScheduleModel(sequelize),
  Specialization: initSpecializationModel(sequelize),
  WeeklySchedule: initWeeklyScheduleModel(sequelize),
  DailyLectureSet: initDailyLectureSetModel(sequelize),
  PasswordResetRequest: initPasswordResetRequestModel(sequelize),
};

associateUserModel(db);
associateBatchModel(db);
associateCourseModel(db);
associateSubjectModel(db);
associateLectureModel(db);
associateClassRoomModel(db);
associateJoinRequestModel(db);
associateClassScheduleModel(db);
associateSpecializationModel(db);
associateWeeklyScheduleModel(db);
associateDailyLectureSetModel(db);

const isDevelopment = process.env.NODE_ENV === 'development';


sequelize
  .sync({ alter: isDevelopment })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default db;
