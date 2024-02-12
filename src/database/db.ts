import { DataSource } from "typeorm"
import { User } from "../entities/user.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "",
    password: "",
    database: "youtube",
    entities:[User],
    synchronize:true
})