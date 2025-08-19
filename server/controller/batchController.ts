import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { createBatchService, deleteBatchByIdService, getAllBatchesService, getBatchByIdService } from "../services/batchService"
import ApiResponse from "../utils/ApiResponse";

export const createBatch = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req?.user?.id;
    const courseId = req.params.id;
    const batchData = { createdBy: id, courseId: courseId, ...req.body };
    if (!id)
        throw new ApiError(400, "User Id not found")

    const batch = await createBatchService(batchData);

    res.status(201).json(new ApiResponse(201, "Batch created successfully", batch))

})

export const getAllBatches = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const batches = await getAllBatchesService();



    res.status(200).json(new ApiResponse(200, "All Batches fetched successfully", batches))

})

export const getBatchById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!id)
        throw new ApiError(400, "Batch Id not found")

    const batches = await getBatchByIdService(id);

    res.status(200).json(new ApiResponse(200, "Batch fetched successfully", batches))

})

export const deleteBatch = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!id)
        throw new ApiError(400, "Batch Id not found")

    const batches = await deleteBatchByIdService(id);

    res.status(200).json(new ApiResponse(200, "Batch deleted successfully", batches))

})

