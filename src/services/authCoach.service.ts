import { Request,Response } from "express"
import { CoachingRequests } from "../entities/coachingRequests.entity"
import { Coach } from "../entities/coach.entity"
import jwt from "jsonwebtoken"
import { calculateAge } from "../utils/utils"


export const s_login = async (req:Request,res:Response)=>{
    console.log(req.body);
    const {email,password} = req.body;

    const checkCoachInCoachingRequests = await CoachingRequests.findOne({where:{email:email,password:password}});

    if(!checkCoachInCoachingRequests){
        return res.status(200).json({
            user: null,
            token: null,
            message: "Admin refused you.",
            status: "refused"
        });
    }else if(checkCoachInCoachingRequests.accepted === false){
        return res.status(200).json({
            user: null,
            token: null,
            message: "You still in the waiting list for coaching.",
            status: "waiting"
        });
    }else if(checkCoachInCoachingRequests.accepted === true){
        // Check if email and password exist in the database
        const check_coach = await Coach.findOne({where:{email:email,password:password}});
        
        if(check_coach){
            // Generate token if user is found
            const token = jwt.sign({coachId:check_coach.id},"SecretKey",{expiresIn:"1h"});
            
            // Return user and token
            return res.status(200).json({
                user: check_coach,
                token: token,
                message: "Login successful",
                status: "accepted"
            });
        } else {
            // Return error message if user is not found
            return res.status(400).json({
                user: null,
                token: null,
                message: "Invalid email or password"
            });
        }
    }
}


export const s_register = async (req:Request,res:Response)=>{
    console.log(req.body);
    const { firstName, lastName, username, password, email, gender, certificate, yearsOfExperience } = req.body;
    const userRole = "coach";

    if (!firstName || !lastName || !username || !password || !email || !gender || !certificate || !yearsOfExperience) {
        return res.status(400).json({ message: "All required fields must be provided", state: false });
    }

    let { dateOfBirth } = req.body; // Destructure optional fields
    let age: number | undefined = undefined;

    if (dateOfBirth) {
        age = calculateAge(dateOfBirth);
        if (isNaN(age)) {
            return res.status(400).json({ message: "Invalid date of birth", state: false });
        }
    }

    // Set default values for dateOfBirth, age, weight, and height if not provided
    dateOfBirth = dateOfBirth || undefined;


    let adminId: any = 1;
    const check_coach = await Coach.findOne({ where: { email: email, password: password } });

    if (check_coach) {
        return res.status(400).json({ message: "User already exists", state: false });
    } else {
        const newCoach = await Coach.save({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
            userRole: userRole,
            dateOfBirth: dateOfBirth,
            gender: gender,
            age: age,
            certificate: certificate,
            yearsOfExperience: yearsOfExperience,
            admin: adminId
        });

        const token = jwt.sign({ coachId: newCoach.id }, "SecretKey", { expiresIn: "1h" });
        
        return res.status(200).json({ user: newCoach, token: token, message: "Coach account created successfully" });
    }
}