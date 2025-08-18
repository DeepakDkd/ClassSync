import { ISpecialization } from "../types/specialization"
import { ApiError } from "../utils/ApiError"
import db from '../model/index'
import Course from "../model/courseModel"

export const createSpecializationService = async ({ data, id }: { data: ISpecialization, id: string }): Promise<ISpecialization> => {
    try {
        const { name } = data
        if (!name) {
            throw new ApiError(400, "Specialization name is required")
        }
        if (!id) {
            throw new ApiError(400, " CourseId is required  ")
        }
        const course = await db.Course.findByPk(id)
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

export const getSpecializationService = async (id: string): Promise<ISpecialization> => {
    if (!id)
        throw new ApiError(400, "Id is required")

    const specialization = await db.Specialization.findOne({
        where: { id: id },
        include: [
            {
                model: Course,
                as: 'course',
            }
        ]
    })

    if (!specialization)
        throw new ApiError(404, "Specialization not found")
    console.log(JSON.stringify(specialization))
    return specialization;
}
export const deleteSpecializationService = async (id: string): Promise<ISpecialization> => {
    try {

        const specialization = await db.Specialization.findByPk(id);
        if (!specialization) {
            throw new ApiError(404, "Specialization not found")
        }
        await specialization.destroy();
        return specialization;
    } catch (error: any) {
        console.log("Error in deleting Specialization", error)
        throw new ApiError(500, "Failed to deleting Specialization ", [error.message || error])
    }
}