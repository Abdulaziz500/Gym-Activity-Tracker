import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Coach } from "../entities/coach.entity";

export const coachIsAuthenticated = async (req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers.authorization){
        return res.status(401).json({success:false,message:"No authorization headers available"})
    }
    const header = req.headers.authorization
    const method = header.split(" ")[0]
    const token = header.split(" ")[1]
    if(!method || !token) return res.status(401).json({success:false,message:"Invalid auth header"})
    else if(method !== "Bearer") return res.status(401).json({success:false,message:"Invalid auth method"})

    let tokenBody:any
    try{
        tokenBody = jwt.verify(token,"SecretKey")
    }catch(err){
        return res.status(401).json({success:false,message:"Invalid token"})
    }
    if(!tokenBody.coachId) return res.status(401).json({success:false,message:"Invalid token because of missing coachId"})

    const coach = await Coach.findOne({where:{id:tokenBody.coachId}})
    if(!coach) return res.status(401).json({success:false,message:"Coach not found"})
    else{
        req.coachData = coach
        next()
    }
}