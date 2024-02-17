import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/db";
import { trainee_route } from "./routes/trainee.route";
import { auth_route } from "./routes/auth.route";
import { isAuthenticated } from "./middleware/isAuthenticated";

const app = express();

app.use(express.static("../public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth",auth_route)
app.use("/api/v1/trainees",isAuthenticated,trainee_route)


AppDataSource.initialize()
.then(() => {
    console.log('Connected to the database');

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
    
}).catch((err) => {
    console.error("Error during Data Source initialization:", err)
})
