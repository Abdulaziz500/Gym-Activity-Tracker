import { Request, Response } from "express";
import { s_create_coaching_request, s_delete_coaching_request, s_get_coaching_request, s_get_coaching_requests, s_update_coaching_request } from "../services/coachingRequests.service";


export const create_coaching_request = async (req:Request,res:Response)=>{
    const result = await s_create_coaching_request(req,res)
    return result
}

export const get_coaching_requests = async (req:Request,res:Response)=>{
    const result = await s_get_coaching_requests(req,res)
    res.status(200).json(result)
} 

export const get_coaching_request = async (req:Request,res:Response)=>{
    const result = await s_get_coaching_request(req,res)
    res.status(200).json(result)
}

export const delete_coaching_request = async (req:Request,res:Response)=>{
    const result = await s_delete_coaching_request(req,res)
    res.status(200).json(result)
}

export const update_coaching_request = async (req:Request,res:Response)=>{
    const result = await s_update_coaching_request(req,res)
    res.status(200).json(result)
}