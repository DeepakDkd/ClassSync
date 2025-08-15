import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware";
import { createCourse } from "../controller/courseController";
import { createSpecialization } from "../controller/specializationController";

const router = Router();

router.route("/create-course").post(verifyJWT, createCourse);
// router.route("/").get(verifyJWT, getCourses);

// router.route("/course/:id")
//   .get(verifyJWT, getCourseById);

router.route("/:id/create-specialization").post(verifyJWT, createSpecialization);

export default router;