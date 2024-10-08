import express from "express";
import { create_workout, delete_workout, get_trainee_workouts, get_workout, get_workouts } from "../controllers/workout.controller";
export const workout_route = express.Router();

workout_route.post("/create_workout",create_workout)
workout_route.get("/get_workouts",get_workouts)
workout_route.get("/get_trainee_workouts/:userId/:userRole",get_trainee_workouts)
workout_route.get("/get_workout/:id",get_workout)
workout_route.delete("/delete_workout/:id",delete_workout)