import { Request, Response } from "express"
import asyncHandler from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError";
import { approveRequestService, deleteRequestService, getAllRequestService, joinRequestService } from "../services/joinRequestService";
import ApiResponse from "../utils/ApiResponse";


export const joinRequest = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const courseId = req.params.id;
    const batchId = req.body.batchId;
    const studentId = req.user?.id;
    if (!courseId)
        throw new ApiError(400, "Batch Id not found");
    if (!studentId)
        throw new ApiError(400, "User Id not found");

    const data = { courseId: courseId, studentId: studentId, batchId: batchId, ...req.body }

    const request = await joinRequestService(data);
    res.status(200).json(new ApiResponse(200, "Join request send successfully", request))
})




export const approveRequest = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const reviewedBy = req?.user?.id
    if (!reviewedBy)
        throw new ApiError(400, "User Id not found");
    const {  status } = req.body;
    const requestData = { id,  status, reviewedBy }
    const response = await approveRequestService(requestData);
    res.status(200).json(new ApiResponse(200, "Join request updated successfully", response));
})

export const deleteJoinRequest = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!id)
        throw new ApiError(400, "Join request Id not found")

    const batches = await deleteRequestService(id);

    res.status(200).json(new ApiResponse(200, "Join request deleted successfully", batches))

})


export const getAllJoinRequest = asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const allRequests = await getAllRequestService();
    res.status(200).json(new ApiResponse(200, "Fetched all Join request successfully", allRequests));
})

