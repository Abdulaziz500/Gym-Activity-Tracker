import express from "express";
import { create_recommendation } from "../controllers/recommendation.controller";
export const recommendedBodyPart_route = express.Router();

recommendedBodyPart_route.post("/create_recommendation",create_recommendation);