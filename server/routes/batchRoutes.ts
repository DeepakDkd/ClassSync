import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { createBatch, getAllBatches, getBatchById, joinRequest } from "../controller/batchController";

const router = Router();


router.route("/").get(getAllBatches);
router.route("/:id").get(verifyJWT, getBatchById);
router.route("/create-batch").post(verifyJWT, createBatch);

router.route("/join-request/:id").post(verifyJWT,joinRequest);


export default router;