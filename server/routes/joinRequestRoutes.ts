
import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { approveRequest, deleteJoinRequest, getAllJoinRequest, joinRequest } from "../controller/joinRequestController"

const router = Router();

router.route("/:id").post(verifyJWT, joinRequest);
router.route("/get-all").get(verifyJWT, getAllJoinRequest);//not tested
router.route("/approve-join-request/:id").post(verifyJWT, approveRequest);
router.route("/delete/:id").post(verifyJWT, deleteJoinRequest);//not tested

export default router;