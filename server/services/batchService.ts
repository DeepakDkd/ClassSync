import db from "../model";
import { IBatch } from "../types/batch";
import { IJoinRequest } from "../types/JoinRequest";
import { ApiError } from "../utils/ApiError";

export const createBatchService = async (data: IBatch): Promise<IBatch> => {
    try {

        if (!data.name) {
            throw new ApiError(400, "Batch name is required")
        }
        const batch = await db.Batch.create({ ...data })

        if (!batch) {
            throw new ApiError(500, "creation failed of batch")
        }

        return batch;
    } catch (error: any) {
        console.log("failed to create Batch", error)
        throw new ApiError(500, "Failed to create batch", [error.message | error])
    }
}

export const getAllBatchesService = async (): Promise<IBatch[]> => {
    try {

        const batches = await db.Batch.findAll();
        if (!batches) {
            throw new ApiError(404, "Batches not found")
        }
        return batches;
    } catch (error: any) {
        console.log("Error in Batches fetching", error)
        throw new ApiError(500, "Batches fetching Failed", [error.message || error])

    }
}
export const getBatchByIdService = async (id: string): Promise<IBatch> => {
    try {

        const batches = await db.Batch.findByPk(id);
        if (!batches) {
            throw new ApiError(404, "Batch not found")
        }
        return batches;
    } catch (error: any) {
        console.log("Error in fetching Batch", error)
        throw new ApiError(500, "Failed to fetch Batch ", [error.message || error])
    }
}

export const joinRequestService = async ({ batchId, studentId }: { batchId: string, studentId: string }): Promise<IJoinRequest> => {
    try {
        const data: any = { batchId: batchId, studentId: studentId }
        const request = await db.JoinRequest.create({ ...data })
        if (!request) {
            throw new ApiError(404, "Faild to create join request.")
        }
        return request;
    } catch (error: any) {
        console.log("Join request failed to batch", error)
        throw new ApiError(500, "Join request failed to batch ", [error.message || error])
    }
}

