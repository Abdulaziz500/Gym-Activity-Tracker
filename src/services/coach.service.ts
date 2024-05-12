import { Request, Response } from "express";
import { Coach } from "../entities/coach.entity";

export const s_create_coach = async (req:Request,res:Response)=>{
    const {firstName,lastName,username,password,email,dateOfBirth,
        gender,age,yearsOfExperience,certificate} = req.body
    const userRole = "coach"
    let adminId:any = 1
    const newCoach = await Coach.save({
        firstName:firstName,
        lastName:lastName,
        username:username,
        password:password,
        email:email,
        userRole:userRole,
        dateOfBirth:dateOfBirth,
        gender:gender,
        age:age,
        yearsOfExperience:yearsOfExperience,
        certificate:certificate,
        admin:adminId
    })
    return newCoach
}

export const s_get_coaches = async (req:Request,res:Response)=>{
    const coaches = await Coach.find()
    return coaches
}

export const s_get_coach = async (req: Request, res: Response) => {
    const coach_id: any = req.params.id;
    const coach = await Coach.findOne({ where: { id: coach_id } });
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

export const s_delete_coach = async (req:Request,res:Response)=>{
    const coach_id:any = req.params.id
    const coach = await Coach.findOne({where:{id:coach_id}})
    if(coach){
        await Coach.remove(coach)
        return "Coach deleted"
    }else{
        return "Coach not found"
    }
}

export const s_update_coach = async (req: Request, res: Response) => {
    const coach_id: any = req.params.id;
    const {firstName,lastName,username,password,email,dateOfBirth,
        gender,age,yearsOfExperience,certificate,adminId} = req.body
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
    if (adminId) {
        updateFields.adminId = adminId;
    }

    try {
        // Perform the update with only the provided fields
        const updated_coach = await Coach.update({ id: coach_id }, updateFields);
        return updated_coach;
    } catch (error:any) {
        return error.message; // Handle error appropriately
    }
};