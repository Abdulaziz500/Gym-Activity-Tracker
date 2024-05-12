import { Request, Response } from "express";
import { CoachingRequests } from "../entities/coachingRequests.entity";
import jwt from "jsonwebtoken"
import { calculateAge } from "../utils/utils";

export const s_create_coaching_request = async (req:Request,res:Response)=>{
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

    // Set default value for dateOfBirth if not provided
    dateOfBirth = dateOfBirth || undefined;


    let adminId: any = 1;
    const check_coach = await CoachingRequests.findOne({ where: { email: email, password: password } });

    if (check_coach) {
        return res.status(400).json({ message: "User already exists", state: false });
    } else {
        const newCoach = await CoachingRequests.save({
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
        
        return res.status(200).json({ user: newCoach, token: token, message: "Coaching request created successfully" });
    }
}

export const s_get_coaching_requests = async (req:Request,res:Response)=>{
    const coaches = await CoachingRequests.find({});
    return coaches
}

export const s_get_coaching_request = async (req: Request, res: Response) => {
    const coach_id: any = req.params.id;
    const coach = await CoachingRequests.findOne({ where: { id: coach_id } });
    if (coach?.id) {
        if(coach.dateOfBirth){
            // Convert date object to string
            const dateOfBirthString = coach.dateOfBirth.toISOString();
            // Extract date portion from the trainee's date of birth
            const dateOfBirth = dateOfBirthString.split("T")[0];
            // Construct a new trainee object with date of birth in date format
            const coachWithDateOfBirth = { ...coach, dateOfBirth };
            return coachWithDateOfBirth;
        }else{
            return coach
        }
    } else {
        return "Coach not found";
    }
}

export const s_delete_coaching_request = async (req:Request,res:Response)=>{
    const coach_id:any = req.params.id
    const coach = await CoachingRequests.findOne({where:{id:coach_id}})
    if(coach){
        await CoachingRequests.remove(coach)
        return "Coach deleted"
    }else{
        return "Coach not found"
    }
}

export const s_update_coaching_request = async (req: Request, res: Response) => {
    const coach_id: any = req.params.id;
    const {firstName,lastName,username,password,email,dateOfBirth,
        gender,age,yearsOfExperience,certificate, accepted,adminId} = req.body
    // Initialize an empty object to hold the fields to update
    const updateFields: any = {};

    // Check if each field is provided and add it to the update object if it exists
    if (firstName) {
        updateFields.firstName = firstName;
    }
    if (lastName) {
        updateFields.lastName = lastName;
    }
    if (username) {
        updateFields.username = username;
    }
    if (password) {
        updateFields.password = password;
    }
    if (email) {
        updateFields.email = email;
    }
    if (dateOfBirth) {
        updateFields.dateOfBirth = dateOfBirth;
    }
    if (gender) {
        updateFields.gender = gender;
    }
    if (age) {
        updateFields.age = age;
    }
    if (yearsOfExperience) {
        updateFields.yearsOfExperience = yearsOfExperience;
    }
    if (certificate) {
        updateFields.certificate = certificate;
    }
    if (accepted) {
        updateFields.accepted = accepted;
    }
    if (adminId) {
        updateFields.adminId = adminId;
    }

    try {
        // Perform the update with only the provided fields
        const updated_coach = await CoachingRequests.update({ id: coach_id }, updateFields);
        return updated_coach;
    } catch (error:any) {
        return error.message; // Handle error appropriately
    }
};