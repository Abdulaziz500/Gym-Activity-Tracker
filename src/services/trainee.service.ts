import { Request, Response } from "express";
import { Trainee } from "../entities/trainee.entity";

export const s_create_trainee = async (req:Request,res:Response)=>{
    const {firstName,lastName,username,password,email,dateOfBirth,
        gender,age,weight,height} = req.body
    const userRole = "trainee"
    let coachId:any = null
    let adminId:any = 1
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
    return newTrainee
}

export const s_get_trainees = async (req:Request,res:Response)=>{
    const trainees = await Trainee.find()
    return trainees
}

export const s_get_trainee = async (req: Request, res: Response) => {
    const trainee_id: any = req.params.id;
    const trainee = await Trainee.findOne({ where: { id: trainee_id } });
    if (trainee?.id) {
        if(trainee.dateOfBirth){
            // Convert date object to string
            const dateOfBirthString = trainee.dateOfBirth.toISOString();
            // Extract date portion from the trainee's date of birth
            const dateOfBirth = dateOfBirthString.split("T")[0];
            // Construct a new trainee object with date of birth in date format
            const traineeWithDateOfBirth = { ...trainee, dateOfBirth };
            return traineeWithDateOfBirth;
        }else{
            return trainee
        }

    } else {
        return "Trainee not found";
    }
}

export const s_delete_trainee = async (req:Request,res:Response)=>{
    const trainee_id:any = req.params.id
    const trainee = await Trainee.findOne({where:{id:trainee_id}})
    if(trainee){
        await Trainee.remove(trainee)
        return "Trainee deleted"
    }else{
        return "Trainee not found"
    }
}

export const s_update_trainee = async (req: Request, res: Response) => {
    const trainee_id: any = req.params.id;
    const {firstName,lastName,username,password,email,dateOfBirth,
        gender,age,weight,height,coachId,adminId} = req.body
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
    if (weight) {
        updateFields.weight = weight;
    }
    if (height) {
        updateFields.height = height;
    }
    if (coachId) {
        updateFields.coachId = coachId;
    }
    if (adminId) {
        updateFields.adminId = adminId;
    }

    try {
        // Perform the update with only the provided fields
        const updated_trainee = await Trainee.update({ id: trainee_id }, updateFields);
        return updated_trainee;
    } catch (error:any) {
        return error.message; // Handle error appropriately
    }
};