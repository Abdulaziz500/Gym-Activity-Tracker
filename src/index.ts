import "reflect-metadata";
import express from "express";
import { user_route } from "./routes/user.route";
import { AppDataSource } from "./database/db";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/users",user_route)


AppDataSource.initialize()
.then(() => {
    console.log('Connected to the database');

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
    
}).catch((err) => {
    console.error("Error during Data Source initialization:", err)
})
