import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware";
import { createCourse, getCourseById, getCourses } from "../controller/courseController";
import { createSpecialization, getSpecialization } from "../controller/specializationController";

const router = Router();

router.route("/create-course").post(verifyJWT, createCourse);
router.route("/").get(getCourses);

router.route("/course/:id")
    .get(verifyJWT, getCourseById);

router.route("/:id/create-specialization").post(verifyJWT, createSpecialization);

router.route("/get-specialization/:id").get(verifyJWT, getSpecialization)

export default router;