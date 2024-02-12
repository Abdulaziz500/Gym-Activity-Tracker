import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { s_create_user } from "../services/user.service";

export const all_users = async (req:Request,res:Response)=>{
    res.send("All users")
} 

export const create_user = async (req:Request,res:Response)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({error:true,
            errors:errors.array(),
            message:"Validation error"})
    }else{
        const result = await s_create_user(req,res)
        res.json(result)
    }
}