import { Request, Response } from "express";
import { s_create_coach, s_delete_coach, s_get_coach, s_get_coaches, s_update_coach } from "../services/coach.service";

export const create_coach = async (req:Request,res:Response)=>{
    const result = await s_create_coach(req,res)
    res.status(201).json(result)
}

export const get_coaches = async (req:Request,res:Response)=>{
    const result = await s_get_coaches(req,res)
    res.status(200).json(result)
} 

export const get_coach = async (req:Request,res:Response)=>{
    const result = await s_get_coach(req,res)
    res.status(200).json(result)
}

export const delete_coach = async (req:Request,res:Response)=>{
    const result = await s_delete_coach(req,res)
    res.status(200).json(result)
}

export const update_coach = async (req:Request,res:Response)=>{
    const result = await s_update_coach(req,res)
    res.status(200).json(result)
} 