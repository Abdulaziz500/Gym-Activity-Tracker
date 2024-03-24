import express from 'express';
import axios from 'axios';
import { Exercise } from '../entities/exercise.entity';

export const fetch_exercises_router = express.Router();

fetch_exercises_router.get('/fetch-and-store-exercises', async (req, res) => {
    try {
        const url = 'https://api.api-ninjas.com/v1/exercises?offset=0&difficulty=expert';

        const response = await axios.get(url, {
            headers: {
                'X-Api-Key': '+FKKTzZrSAqvFlAZf2zddg==9Pu70bnuEer0iXMz',
                'Content-Type': 'application/json'
            }
        });
        const exercisesData = response.data.slice(0, 8); // Slice to get only the first 8 exercises

        // Transform and store exercises in the database
        exercisesData.forEach(async (exerciseData: any) => {
            const exercise = new Exercise();
            exercise.name = exerciseData.name;
            exercise.type = exerciseData.type;
            exercise.muscle = exerciseData.muscle;
            exercise.equipment = exerciseData.equipment;
            exercise.difficulty = exerciseData.difficulty;
            exercise.instructions = exerciseData.instructions;

            // Save each exercise to the database
            await exercise.save();
        });

        // Return success message
        console.log('Exercises stored successfully.');
        res.status(200).json({ message: 'Exercises stored successfully.' });
    } catch (error) {
        console.error('Error storing exercises:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});