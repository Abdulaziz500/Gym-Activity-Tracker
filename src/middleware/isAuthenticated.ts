import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Trainee } from "../entities/trainee.entity";

export const isAuthenticated = async (req:Request,res:Response,next:NextFunction)=>{
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
    if(!tokenBody.traineeId) return res.status(401).json({success:false,message:"Invalid token because of missing traineeId"})

    const trainee = await Trainee.findOne({where:{id:tokenBody.traineeId}})
    if(!trainee) return res.status(401).json({success:false,message:"Trainee not found"})
    else{
        req.traineeData = trainee
        next()
    }
}