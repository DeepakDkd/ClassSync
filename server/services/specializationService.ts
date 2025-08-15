import { ISpecialization } from "../types/specialization"
import { ApiError } from "../utils/ApiError"
import db from '../model/index'

export const createSpecializationService = async ({data,id}:{data: ISpecialization,id:string}):Promise<ISpecialization> => {
    try {
        const { name } = data
        if (!name) {
            throw new ApiError(400, "Specialization name is required")
        }
        if (!id) {
            throw new ApiError(400, " CourseId is required  ")
        }
        const course = await db.Course.findByPk(id)
        console.log("course is ", course)
        if (!course) {
            throw new ApiError(404, "Course not found")
        }
        const { courseId, ...restData } = data;
        const specialization = await db.Specialization.create({ courseId: id, ...restData })
        if (!specialization) {
            throw new ApiError(500, "creation failed of specialization")
        }
        return specialization

    } catch (error: any) {
        console.log("failed to create specialization", error)
        throw new ApiError(500, "Failed to create specialization", [error.message | error])

    }
}