import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createSpecializationService, deleteSpecializationService, getSpecializationService } from "../services/specializationService"
import ApiResponse from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

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

export const deleteSpecialization = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!id)
        throw new ApiError(400, "Specialization Id not found")

    const batches = await deleteSpecializationService(id);

    res.status(200).json(new ApiResponse(200, "Specialization deleted successfully", batches))

})