import { Request , Response  } from "express";
import asyncHandler from "../utils/asyncHandler";
import {createSpecializationService} from "../services/specializationService" 

export const createSpecialization = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

    const specialization = await createSpecializationService({data:req.body,id})
    console.log("Specialization ",specialization)

    res.status(201).json({
        message: "Specialization created successfully",
        data:specialization
    });
});
