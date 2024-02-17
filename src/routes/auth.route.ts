import express from "express";
import { login,register } from "../controllers/auth.controller";

export const auth_route = express.Router();

auth_route.post("/login",login)
auth_route.post("/register",register)