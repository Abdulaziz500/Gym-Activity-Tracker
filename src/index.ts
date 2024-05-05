import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./database/db";
import { trainee_route } from "./routes/trainee.route";
import { auth_route } from "./routes/auth.route";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { exercise_route } from "./routes/exercise.route";
import { fetch_exercises_router } from "./routes/fetchExercises.route";
import { save_exercise_images_router } from "./routes/saveExerciseImages.route";
import { workout_route } from "./routes/workout.route";
import { delete_Entity_router } from "./routes/DeleteEntity.route";
import { recommendedBodyPart_route } from "./routes/recommendedBodyPart.route";

const app = express();

// Allow requests from all origins
app.use(cors());

// Serve static files from the "../public" directory
app.use(express.static("../public"))

// Parse application/json
app.use(express.json())
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

//routes
app.use("/api/v1/auth",auth_route)
// app.use("/api/v1/trainees",isAuthenticated,trainee_route)
app.use("/api/v1/trainees",trainee_route)
app.use("/api/v1/exercises",exercise_route)
app.use("/api/v1/workouts",workout_route)
app.use("/api/v1/recommendation",recommendedBodyPart_route)

// Use the fetch_exercises_router
app.use("/api/v1", fetch_exercises_router);
// use the save_exercise_images_router
app.use("/api/v1",save_exercise_images_router);
// use the delete_entity_router
app.use("/api/v1",delete_Entity_router);

const port = 3000;

AppDataSource.initialize()
.then(() => {
    console.log('Connected to the database');
    // Start the Express server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    
}).catch((err) => {
    console.error("Error during Data Source initialization:", err)
})