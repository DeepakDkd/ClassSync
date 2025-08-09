import { sequelize } from "../config/db";
import { associateUserModel, initUserModel } from "./userModel";
import { associateClassRoomModel, initClassRoomModel } from "./classRoomModel";
import { initBatchModel, associateBatchModel } from './batchModel'
import {initClassScheduleModel, associateClassScheduleModel} from './classSchedule';
import { initLectureModel,associateLectureModel } from "./lectureModel";
import {
  associateJoinRequestModel,
  initJoinRequestModel,
} from "./joinRequestModel";
import { initSubjectModel, associateSubjectModel } from "./subjectModel";
import { initCourseModel, associateCourseModel } from "./courseModel";
import {initSpecializationModel, associateSpecializationModel} from './specializationModel';

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
