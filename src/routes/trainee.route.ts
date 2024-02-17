import express from "express";
import { create_trainee, delete_trainee, get_trainee, get_trainees, update_trainee } from "../controllers/trainee.controller";
export const trainee_route = express.Router();

trainee_route.post("/create_trainee",create_trainee)
trainee_route.get("/get_trainees",get_trainees)
trainee_route.get("/get_trainee/:id",get_trainee)
trainee_route.delete("/delete_trainee/:id",delete_trainee)
trainee_route.put("/update_trainee/:id",update_trainee)