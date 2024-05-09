import { Request,Response } from "express"
import { Trainee } from "../entities/trainee.entity"
import jwt from "jsonwebtoken"
import { calculateAge } from "../utils/utils"


export const s_login = async (req:Request,res:Response)=>{
    console.log(req.body);
    const {email,password} = req.body;
    
    // Check if email and password exist in the database
    const check_trainee = await Trainee.findOne({where:{email:email,password:password}});
    
    if(check_trainee){
        // Generate token if user is found
        const token = jwt.sign({traineeId:check_trainee.id},"SecretKey",{expiresIn:"1h"});
        
        // Return user and token
        return res.status(200).json({
            user: check_trainee,
            token: token,
            message: "Login successful"
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


export const s_register = async (req:Request,res:Response)=>{
    console.log(req.body);
    const { firstName, lastName, username, password, email, gender } = req.body;
    const userRole = "trainee";

    if (!firstName || !lastName || !username || !password || !email || !gender) {
        return res.status(400).json({ message: "All required fields must be provided", state: false });
    }

    let { dateOfBirth, weight, height } = req.body; // Destructure optional fields
    let age: number | undefined = undefined;

    if (dateOfBirth) {
        age = calculateAge(dateOfBirth);
        if (isNaN(age)) {
            return res.status(400).json({ message: "Invalid date of birth", state: false });
        }
    }

    // Set default values for dateOfBirth, age, weight, and height if not provided
    dateOfBirth = dateOfBirth || undefined;
    weight = weight || undefined;
    height = height || undefined;

    let coachId: any = null;
    let adminId: any = 1;
    const check_trainee = await Trainee.findOne({ where: { email: email, password: password } });

    if (check_trainee) {
        return res.status(400).json({ message: "User already exists", state: false });
    } else {
        const newTrainee = await Trainee.save({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
            userRole: userRole,
            dateOfBirth: dateOfBirth,
            gender: gender,
            age: age,
            weight: weight,
            height: height,
            coach: coachId,
            admin: adminId
        });

        const token = jwt.sign({ traineeId: newTrainee.id }, "SecretKey", { expiresIn: "1h" });
        
        return res.status(200).json({ user: newTrainee, token: token, message: "Trainee account created successfully" });
    }
}