import { Request, Response } from "express";
import { s_create_recommendation } from "../services/recommendation.service";


export const create_recommendation = async (req:Request,res:Response)=>{
    const result = await s_create_recommendation(req,res)
    res.status(201).json(result)
}