import { Request, Response } from "express";
import { s_create_workout, s_delete_workout, s_get_workout, s_get_workouts, s_update_workout } from "../services/workout.service";

export const create_workout = async (req:Request,res:Response)=>{
    const result = await s_create_workout(req,res)
    return result
}

export const get_workouts = async (req:Request,res:Response)=>{
    const result = await s_get_workouts(req,res)
    return result
} 

export const get_workout = async (req:Request,res:Response)=>{
    const result = await s_get_workout(req,res)
    return result
}

export const delete_workout = async (req:Request,res:Response)=>{
    const result = await s_delete_workout(req,res)
    return result
}

export const update_workout = async (req:Request,res:Response)=>{
    const result = await s_update_workout(req,res)
    return result
} 