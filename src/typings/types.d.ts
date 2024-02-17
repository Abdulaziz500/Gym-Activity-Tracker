import { Trainee } from "../entities/trainee.entity";
import { Request } from "express"

declare global{
    namespace Express{
        export interface Request{
            traineeData?:Trainee
        }
    }
}