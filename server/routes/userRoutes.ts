import Router from "express";
import { getUserById } from "../controller/userController";
import {verifyJWT} from "../middleware/auth.middleware"

const router = Router();

router.route("/get-user").get(verifyJWT,getUserById);

export default router;
