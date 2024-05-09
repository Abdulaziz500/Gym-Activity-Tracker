import express from "express";
import { create_coaching_request, delete_coaching_request, get_coaching_request, get_coaching_requests, update_coaching_request } from "../controllers/coachingRequests.controller";

export const coaching_request_route = express.Router();

coaching_request_route.post("/create_coaching_request",create_coaching_request)
coaching_request_route.get("/get_coaching_requests",get_coaching_requests)
coaching_request_route.get("/get_coaching_request/:id",get_coaching_request)
coaching_request_route.delete("/delete_coaching_request/:id",delete_coaching_request)
coaching_request_route.put("/update_coaching_request/:id",update_coaching_request)