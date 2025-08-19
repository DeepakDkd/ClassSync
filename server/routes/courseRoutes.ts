import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware";
import { createCourse, deleteCourse, getCourseById, getCourses } from "../controller/courseController";
import { createSpecialization, deleteSpecialization, getSpecialization } from "../controller/specializationController";

const router = Router();

router.route("/create-course").post(verifyJWT, createCourse);
router.route("/").get(getCourses);
router.route("/:id").get(verifyJWT, getCourseById);
router.route("/delete/:id").post(verifyJWT, deleteCourse);

router.route("/create-specialization/:id").post(verifyJWT, createSpecialization);
router.route("/delete-specialization/:id").post(verifyJWT, deleteSpecialization);
router.route("/get-specialization/:id").get(verifyJWT, getSpecialization);

export default router;