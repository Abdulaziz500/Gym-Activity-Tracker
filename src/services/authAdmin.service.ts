import { Request,Response } from "express"
import { Admin } from "../entities/admin.entity"
import jwt from "jsonwebtoken"


export const s_login = async (req:Request,res:Response)=>{
    console.log(req.body);
    const {email,password} = req.body;
    
    // Check if email and password exist in the database
    const check_admin = await Admin.findOne({where:{email:email,password:password}});
    
    if(check_admin){
        // Generate token if user is found
        const token = jwt.sign({adminId:check_admin.id},"SecretKey",{expiresIn:"1h"});
        
        // Return user and token
        return res.status(200).json({
            user: check_admin,
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
    const { firstName, lastName, username, password, email } = req.body;
    const userRole = "admin";

    if (!firstName || !lastName || !username || !password || !email) {
        return res.status(400).json({ message: "All required fields must be provided", state: false });
    }

    const check_admin = await Admin.findOne({ where: { email: email, password: password } });

    if (check_admin) {
        return res.status(400).json({ message: "User already exists", state: false });
    } else {
        const newAdmin = await Admin.save({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
            userRole: userRole
        });

        const token = jwt.sign({ adminId: newAdmin.id }, "SecretKey", { expiresIn: "1h" });
        
        return res.status(200).json({ user: newAdmin, token: token, message: "Admin account created successfully" });
    }
}