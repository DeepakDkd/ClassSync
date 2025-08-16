import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createSpecializationService, getSpecializationService } from "../services/specializationService"
import ApiResponse from "../utils/ApiResponse";

export const createSpecialization = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const specialization = await createSpecializationService({ data: req.body, id })

    res.status(201).json(new ApiResponse(
        201, "Specialization created successfully",
        specialization
    ));
});

export const getSpecialization = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const specialization = await getSpecializationService(id);

    res.status(201).json(new ApiResponse(201,
        "Specialization fetched successfully",
        specialization
    ));
})
