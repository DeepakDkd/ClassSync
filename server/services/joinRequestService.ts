import db from "../model"
import { IJoinRequest } from "../types/JoinRequest"
import { ApiError } from "../utils/ApiError"

export const joinRequestService = async ({ batchId, studentId }: { batchId: string, studentId: string }): Promise<IJoinRequest> => {
    try {
        const data: any = { batchId: batchId, studentId: studentId }
        if (!batchId) {
            throw new ApiError(400, "Batch Id is required")
        }
        const batch = await db.Batch.findByPk(batchId)
        if (!batch) {
            throw new ApiError(404, "Batch not found")
        }
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

export const approveRequestService = async (data: any): Promise<any> => {

    try {
        console.log("Dataaa", data)

        const { id, batchId, studentId, status, reviewedBy } = data;
        if (!id) {
            throw new ApiError(400, "Request Id if required")
        }
        const respondedAt = new Date();
        console.log("Time::::", respondedAt)
        const [_,updatedData] = await db.JoinRequest.update({
            status: status,
            reviewedBy: reviewedBy,
            respondedAt: respondedAt
        }, { where: { id: id, status: "pending" }, returning: true })
        
        if (!updatedData) {
            throw new ApiError(404, "Request not found")
        }

        return updatedData;


    } catch (error: any) {
        console.log("Join request failed to batch", error)
        throw new ApiError(500, "Join request failed to batch ", [error.message || error])

    }
}
export const deleteRequestService = async (id: string): Promise<IJoinRequest> => {
    try {

        const request = await db.JoinRequest.findByPk(id);
        if (!request) {
            throw new ApiError(404, "Join request not found")
        }
        await request.destroy();
        return request;
    } catch (error: any) {
        console.log("Error in deleting Join request", error)
        throw new ApiError(500, "Failed to deleting Join request ", [error.message || error])
    }
}


export const getAllRequestService = async (): Promise<IJoinRequest[]> => {

    try {
        const requests = await db.JoinRequest.findAll({ where: { status: "pending" } })

        if (!requests) {
            throw new ApiError(404, "Requests not found")
        }

        return requests;


    } catch (error: any) {
        console.log("Failed to get all Join request", error)
        throw new ApiError(500, "Failed to get all Join request ", [error.message || error])

    }
}