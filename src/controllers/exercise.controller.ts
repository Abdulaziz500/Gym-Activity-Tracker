import { Request, Response } from "express";
import { s_create_exercise, s_delete_exercise, s_get_exercise, s_get_exercises, s_update_exercise } from "../services/exercise.service";

export const create_exercise = async (req:Request,res:Response)=>{
    const result = await s_create_exercise(req,res)
    return result
}

export const get_exercises = async (req:Request,res:Response)=>{
    const result = await s_get_exercises(req,res)
    return result
} 

export const get_exercise = async (req:Request,res:Response)=>{
    const result = await s_get_exercise(req,res)
    return result
}

export const delete_exercise = async (req:Request,res:Response)=>{
    const result = await s_delete_exercise(req,res)
    return result
}

export const update_exercise = async (req:Request,res:Response)=>{
    const result = await s_update_exercise(req,res)
    return result
} 