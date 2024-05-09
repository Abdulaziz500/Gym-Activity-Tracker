import express from "express";
import { create_coach, delete_coach, get_coach, get_coaches, update_coach } from "../controllers/coach.controller";
export const coach_route = express.Router();

coach_route.post("/create_coach",create_coach)
coach_route.get("/get_coaches",get_coaches)
coach_route.get("/get_coach/:id",get_coach)
coach_route.delete("/delete_coach/:id",delete_coach)
coach_route.put("/update_coach/:id",update_coach)