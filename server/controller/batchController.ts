import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { createBatchService, getAllBatchesService, getBatchByIdService, joinRequestService } from "../services/batchService"
import ApiResponse from "../utils/ApiResponse";

export const createBatch = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req?.user?.id;
    const batchData = { createdBy: id, ...req.body };
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

export const joinRequest = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const batchId = req.params.id;
    const studentId = req.user?.id;
    if (!batchId)
        throw new ApiError(400, "Batch Id not found");
    if (!studentId)
        throw new ApiError(400, "User Id not found");
    const request = await joinRequestService({ batchId, studentId });
    res.status(200).json(new ApiResponse(200, "Join request send successfully", request))
})