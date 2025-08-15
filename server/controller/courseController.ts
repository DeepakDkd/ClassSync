import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createCourseService } from "../services/courseService"

export const createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    const course = await createCourseService(req.body)
    res.status(201).json({
        message: "Course created successfully",
        data: course
    });
});

