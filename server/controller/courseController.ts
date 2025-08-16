import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createCourseService, getAllCourseService, getCourseByIdService } from "../services/courseService"
import ApiResponse from "../utils/ApiResponse";

export const createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const course = await createCourseService(req.body)

    res.status(201).json(new ApiResponse(200, "Course created successfully", course))
});

export const getCourses = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const allCourse = await getAllCourseService();


    res.status(200).json(new ApiResponse(200, "All courses found successfully", allCourse))
});

export const getCourseById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const course = await getCourseByIdService(id);
    res.status(200).json(new ApiResponse(200,
        "All course found successfully",
        course
    ))
});