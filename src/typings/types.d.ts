import { Trainee } from "../entities/trainee.entity";
import { Request } from "express"
import { Coach } from "../entities/coach.entity";

declare global{
    namespace Express{
        export interface Request{
            traineeData?:Trainee,
            coachData?:Coach,
        }
    }
}