import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createCourseService, getAllCourse } from "../services/courseService"

export const createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const course = await createCourseService(req.body)
    res.status(201).json({
        message: "Course created successfully",
        data: course
    });
});

export const getCourses = asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const course = await getAllCourse();
    res.status(200).json({
        message: "All courses found successfully",
        data: course
    })
})