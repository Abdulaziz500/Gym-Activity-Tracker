import express from "express";
import { create_exercise, delete_exercise, get_exercise, get_exercises, update_exercise } from "../controllers/exercise.controller";
export const exercise_route = express.Router();

exercise_route.post("/create_exercise",create_exercise)
exercise_route.get("/get_exercises",get_exercises)
exercise_route.get("/get_exercise/:id",get_exercise)
exercise_route.delete("/delete_exercise/:id",delete_exercise)
exercise_route.put("/update_exercise/:id",update_exercise)