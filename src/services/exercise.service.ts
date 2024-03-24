import { Request, Response } from "express";
import { Exercise } from "../entities/exercise.entity";

export const s_create_exercise = async (req: Request, res: Response) => {
    console.log(req.body)
    const { name, type, muscle, equipment, difficulty, instructions, imagePath } = req.body;

    // Validate required fields
    if (!name || !type || !muscle || !equipment || !difficulty || !instructions) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate unexpected fields
    const allowedFields = ['name', 'type', 'muscle', 'equipment', 'difficulty', 'instructions', 'imagePath'];
    const unexpectedFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (unexpectedFields.length > 0) {
        return res.status(400).json({ error: 'Unexpected fields: ' + unexpectedFields.join(', ') });
    }

    try {
        const newExerciseData: any = { name, type, muscle, equipment, difficulty, instructions };
        
        // Add image field if provided
        if (imagePath) {
            newExerciseData.imagePath = imagePath;
        }

        const newExercise = await Exercise.save(newExerciseData);
        return res.status(201).json(newExercise);
    } catch (error) {
        console.error('Error creating exercise:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const s_get_exercises = async (req: Request, res: Response) => {
    try {
        const exercises = await Exercise.find({});
        return res.status(200).json(exercises);
    } catch (error) {
        console.error('Error retrieving exercises:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const s_get_exercise = async (req: Request, res: Response) => {
    console.log(req.params)
    const exercise_name: string = req.params.name;

    try {
        const exercise = await Exercise.findOne({ where: { name: exercise_name } });

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        return res.status(200).json(exercise);
    } catch (error) {
        console.error('Error retrieving exercise:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const s_delete_exercise = async (req: Request, res: Response) => {
    console.log(req.params)
    const exercise_name: string = req.params.name;

    try {
        const exercise = await Exercise.findOne({ where: { name: exercise_name } });

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        await Exercise.remove(exercise);
        
        return res.status(200).json({ message: 'Exercise deleted' });
    } catch (error) {
        console.error('Error deleting exercise:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const s_update_exercise = async (req: Request, res: Response) => {
    console.log(req.params)
    console.log(req.body)
    const exercise_name: any = req.params.name;
    const { name, type, muscle, equipment, difficulty, instructions, imagePath } = req.body;

    // Initialize an empty object to hold the fields to update
    const updateFields: any = {};

    // Check if each field is provided and add it to the update object if it exists
    if (name) {
        updateFields.name = name;
    }
    if (type) {
        updateFields.type = type;
    }
    if (muscle) {
        updateFields.muscle = muscle;
    }
    if (equipment) {
        updateFields.equipment = equipment;
    }
    if (difficulty) {
        updateFields.difficulty = difficulty;
    }
    if (instructions) {
        updateFields.instructions = instructions;
    }

    try {
        // Check if imagePath is provided and update the image path if it exists
        if (imagePath) {
            // Update the image path
            updateFields.imagePath = imagePath;
        }

        // Perform the update with only the provided fields
        const updatedExercise = await Exercise.update({ name: exercise_name }, updateFields);

        return res.status(200).json(updatedExercise);
    } catch (error: any) {
        console.error('Error updating exercise:', error);
        return res.status(500).json({ error: error.message }); // Handle error appropriately
    }
};