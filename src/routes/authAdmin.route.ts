import express from "express";
import { login,register } from "../controllers/authAdmin.controller";

export const authAdmin_route = express.Router();

authAdmin_route.post("/login",login)
authAdmin_route.post("/register",register)