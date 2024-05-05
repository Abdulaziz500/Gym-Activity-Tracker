// deleteEntity.route.ts
import { Router } from "express";
import { AppDataSource } from "../database/db";
import { Workout } from "../entities/workout.entity";

export const delete_Entity_router = Router();

async function clearEntityData() {
    try {
        const repository = AppDataSource.getRepository(Workout);
        const workouts = await repository.find();
        for (const workout of workouts) {
            await repository.remove(workout);
        }
        console.log("Entity data cleared successfully.");
        return { success: true };
    } catch (error) {
        console.error("Error clearing entity data:", error);
        return { success: false, error: "An error occurred while clearing entity data." };
    }
}

delete_Entity_router.post("/clear-entity-data", async (req, res) => {
    try {
        const result = await clearEntityData();
        if (result.success) {
            res.status(200).json({ message: "Entity data cleared successfully." });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error("Error handling clear entity data request:", error);
        res.status(500).json({ error: "An error occurred while handling the request." });
    }
});
