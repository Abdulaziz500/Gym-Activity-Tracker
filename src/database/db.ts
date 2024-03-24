import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "bitrate_zit123",
    database: "gym_activity_tracker",
    entities:["src/entities/*.ts"],
    synchronize:true
})