import { sequelize } from "../config/db";
import { associateUserModel, initUserModel } from "./userModel";
import { associateClassRoomModel, initClassRoomModel } from "./classRoomModel";
import { initBatchModel, associateBatchModel } from './batchModel'
import {
  associateJoinRequestModel,
  initJoinRequestModel,
} from "./joinRequestModel";

const db = {
  sequelize,
  User: initUserModel(sequelize),
  ClassRoom: initClassRoomModel(sequelize),
  JoinRequest: initJoinRequestModel(sequelize),
  Batch: initBatchModel(sequelize),
};

associateUserModel(db);
associateClassRoomModel(db);
associateJoinRequestModel(db);
associateBatchModel(db);

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
