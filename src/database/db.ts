import { DataSource } from "typeorm"
import { Admin } from "../entities/admin.entity"
import { Coach } from "../entities/coach.entity"
import { Trainee } from "../entities/trainee.entity"
import { User } from "../entities/user.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "bitrate_zit123",
    database: "gym_activity_tracker",
    entities:[User,Trainee,Coach,Admin],
    synchronize:true
})