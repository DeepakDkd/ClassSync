import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { createBatch } from "../controller/classController";

const router = Router();


router.route("/create-batch").post(verifyJWT, createBatch);
router.route("/")


export default router;