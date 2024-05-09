import { Request,Response } from "express"
import {s_login,s_register} from "../services/authCoach.service"

export const login = async (req:Request,res:Response)=>{
    const result = await s_login(req,res)
    return result
}

export const register = async (req:Request,res:Response)=>{
    const result = await s_register(req,res)
    return result
}