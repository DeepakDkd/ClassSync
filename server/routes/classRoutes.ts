import Router from "express";
import {verifyJWT} from "../middleware/auth.middleware";
import { createClass } from "../controller/classController";

const router = Router();


router.route("/create-class").post(verifyJWT, createClass);