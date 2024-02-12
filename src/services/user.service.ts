import { Request, Response } from "express";
import { User } from "../entities/user.entity";

export const s_create_user = async (req:Request,res:Response)=>{
    const {name,phone,email} = req.body
    const newUser = await User.save({name:name,phone:phone,email:email})
    return newUser
}