import express from "express";
import { login,register } from "../controllers/authTrainee.controller";

export const authTrainee_route = express.Router();

authTrainee_route.post("/login",login)
authTrainee_route.post("/register",register)