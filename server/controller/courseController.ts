import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createCourseService, getAllCourseService, getCourseByIdService } from "../services/courseService"

export const createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const course = await createCourseService(req.body)
    res.status(201).json({
        message: "Course created successfully",
        data: course
    });
});

export const getCourses = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const allCourse = await getAllCourseService();
    res.status(200).json({
        message: "All courses found successfully",
        data: allCourse
    })
});

export const getCourseById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const course = await getCourseByIdService(id);
    res.status(200).json({
        message: "All course found successfully",
        data: course
    })
});