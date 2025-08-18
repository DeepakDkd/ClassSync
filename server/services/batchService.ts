import { DataTypes, where } from "sequelize";
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

        const batch = await db.Batch.findByPk(id);
        if (!batch) {
            throw new ApiError(404, "Batch not found")
        }
        return batch;
    } catch (error: any) {
        console.log("Error in fetching Batch", error)
        throw new ApiError(500, "Failed to fetch Batch ", [error.message || error])
    }
}
export const deleteBatchByIdService = async (id: string): Promise<IBatch> => {
    try {

        const batch = await db.Batch.findByPk(id);
        if (!batch) {
            throw new ApiError(404, "Batch not found")
        }
        await batch.destroy();
        return batch;
    } catch (error: any) {
        console.log("Error in deleting Batch", error)
        throw new ApiError(500, "Failed to deleting Batch ", [error.message || error])
    }
}
