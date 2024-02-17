import { Request,Response } from "express"
import {s_login,s_register} from "../services/auth.service"

export const login = async (req:Request,res:Response)=>{
    const result = await s_login(req,res)
    res.status(200).json(result)
}

export const register = async (req:Request,res:Response)=>{
    const result = await s_register(req,res)
    res.status(201).json(result)
}