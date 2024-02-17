import { Request,Response } from "express"
import { Trainee } from "../entities/trainee.entity"
import jwt from "jsonwebtoken"


export const s_login = async (req:Request,res:Response)=>{
    const {email,password} = req.body
    const check_trainee = await Trainee.findOne({where:{email:email,password:password}})
    if(check_trainee){
        const token = jwt.sign({traineeId:check_trainee.id},"SecretKey",{expiresIn:"1h"})
        let obj = {
            user:check_trainee,
            token:token,
            message:"login successfully"
        }
        return obj
    }else{
        let obj = {
            user:null,
            token:null,
            message:"login failed"
        }
        return obj
    }
}

export const s_register = async (req:Request,res:Response)=>{
    const {firstName,lastName,username,password,email,dateOfBirth,
        gender,age,weight,height} = req.body
    const userRole = "trainee"
    let coachId:any = null
    let adminId:any = null
    const check_trainee = await Trainee.findOne({where:{email:email,password:password}})
    if(check_trainee){
        let obj = {
            message:"User already exist",
            state:false
        }
        return obj
    }else{
        const newTrainee = await Trainee.save({
            firstName:firstName,
            lastName:lastName,
            username:username,
            password:password,
            email:email,
            userRole:userRole,
            dateOfBirth:dateOfBirth,
            gender:gender,
            age:age,
            weight:weight,
            height:height,
            coach:coachId,
            admin:adminId
        })
        const token = jwt.sign({traineeId:newTrainee.id},"SecretKey",{expiresIn:"1h"})
        let obj = {
            user:newTrainee,
            token:token,
            message:"Trainee account created successfully"
        }
        return obj
    }

}