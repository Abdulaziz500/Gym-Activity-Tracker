import express from "express";
import { login,register } from "../controllers/authCoach.controller";

export const authCoach_route = express.Router();

authCoach_route.post("/login",login)
authCoach_route.post("/register",register)