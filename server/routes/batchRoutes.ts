import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import {  createBatch, deleteBatch, getAllBatches,  getBatchById } from "../controller/batchController";

const router = Router();


router.route("/").get(getAllBatches);
router.route("/:id").get(verifyJWT, getBatchById);
router.route("/create-batch").post(verifyJWT, createBatch);
router.route("/delete/:id").post(verifyJWT, deleteBatch);//not tested




export default router;