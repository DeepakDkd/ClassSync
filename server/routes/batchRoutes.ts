import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { approveRequest, createBatch, getAllBatches, getAllJoinRequest, getBatchById, joinRequest } from "../controller/batchController";

const router = Router();


router.route("/").get(getAllBatches);
router.route("/:id").get(verifyJWT, getBatchById);
router.route("/create-batch").post(verifyJWT, createBatch);

router.route("/join-request/:id").post(verifyJWT,joinRequest);
router.route("/approve-join-request/:id").post(verifyJWT,approveRequest);
router.route("/join-requests").get(verifyJWT,getAllJoinRequest);


export default router;