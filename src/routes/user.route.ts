import express from "express";
import { all_users, create_user } from "../controllers/user.controller";
import { create_user_validation } from "../validations/user/create_user.validation";
export const user_route = express.Router();

user_route.get("/allusers",all_users)

user_route.post("/create",create_user_validation(),create_user)