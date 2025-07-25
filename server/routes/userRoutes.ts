import Router from "express";
import { getUserById } from "../controller/userController";

const router = Router();

router.route("/get-user/:id").get(getUserById);

export default router;
