import { Request, Response } from "express";
import { s_create_trainee, s_delete_trainee, s_get_trainee, s_get_trainees, s_update_trainee } from "../services/trainee.service";


export const create_trainee = async (req:Request,res:Response)=>{
    const result = await s_create_trainee(req,res)
    res.status(201).json(result)
}

export const get_trainees = async (req:Request,res:Response)=>{
    const result = await s_get_trainees(req,res)
    res.status(200).json(result)
} 

export const get_trainee = async (req:Request,res:Response)=>{
    const result = await s_get_trainee(req,res)
    res.status(200).json(result)
}

export const delete_trainee = async (req:Request,res:Response)=>{
    const result = await s_delete_trainee(req,res)
    res.status(200).json(result)
}

export const update_trainee = async (req:Request,res:Response)=>{
    const result = await s_update_trainee(req,res)
    res.status(200).json(result)
} 