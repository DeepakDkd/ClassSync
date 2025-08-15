import { ICourse } from "../types/course";
import { ApiError } from "../utils/ApiError"
import db from "../model";
export const createCourseService = async (course: ICourse): Promise<ICourse> => {
    try {
        if (!course.name) {
            throw new ApiError(400, " Course name is required ")
        }
        if (!course.durationInYears) {
            throw new ApiError(400, "Duration year is required")
        }
        const newCourse = await db.Course.create({ ...course });
        if (!newCourse) {
            throw new ApiError(500, `Failed to create course ${course}`)
        }

        return newCourse;


    } catch (error: any) {
        console.log("Error in Course Creation", error)
        throw new ApiError(500, "Course Creation Failed", [error.message || error])
    }

}

export const getAllCourse = async (): Promise<ICourse[]> => {
    try {

        const course = await db.Course.findAll();
        if (!course) {
            throw new ApiError(404, "Courses not found")
        }
        return course
    } catch (error: any) {
        console.log("Error in Course Creation", error)
        throw new ApiError(500, "Course Creation Failed", [error.message || error])

    }
}