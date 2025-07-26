import Router from "express";
import { getUserById } from "../controller/userController";
import {verifyJWT} from "../middleware/auth.middleware"

const router = Router();

router.route("/get-user/:id").get(verifyJWT,getUserById);

export default router;
