import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
export const createBatch =asyncHandler( async (req:Request, res:Response): Promise<void> => {
    const {name,description , createdBy,isActive} = req.body;
    
    
})