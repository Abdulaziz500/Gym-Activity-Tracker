import { Request, Response } from "express";
import { Exercise } from "../entities/exercise.entity";
import { Includes } from "../entities/includes.entity";
import { Sets } from "../entities/sets.entity";
import { Workout } from "../entities/workout.entity";

export const s_create_workout = async (req: Request, res: Response) => {
    console.log(req.body)
  try {
    const { name, user, duration, includes } = req.body;

    // Create the workout instance
    const workout = new Workout();
    workout.name = name;
    workout.duration = duration;
    workout.trainee = user;

    // Save the workout to the database
    await workout.save();

    // Link existing exercises to the workout and save sets
    for (const includedExercise of includes) {
      // Assuming includedExercise.name is the name of the pre-stored exercise
      const exercise = await Exercise.findOne({ where: { name: includedExercise.name } });
      if (exercise) {
        const includesEntry = new Includes();
        includesEntry.workout = workout;
        includesEntry.exercise = exercise;
        await includesEntry.save();

        // Save sets for the included exercise
        for (const set of includedExercise.sets) {
            const weight = typeof set.weight === 'number' && !isNaN(set.weight) ? set.weight : null;
            const reps = typeof set.reps === 'number' && !isNaN(set.reps) ? set.reps : null;
            
            // Exclude sets with done value of zero and reps not null (trainee didn't finish the set)
            if (set.done !== 0 && reps !== null) {
                const setsEntry = new Sets();
                setsEntry.includes = includesEntry;
                setsEntry.setNumber = set.setNumber;
                setsEntry.weight = weight;
                setsEntry.reps = reps
                setsEntry.done = set.done;
                console.log(setsEntry);
                await setsEntry.save();
            }
        }
      } else {
        console.warn(`Exercise "${includedExercise.name}" not found in the database.`);
      }
    }

    console.log('Workout created successfully');
    // Respond with success message
    res.status(201).json({ message: 'Workout created successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


/////////////////////////////////////////////////////////////////  todo

export const s_get_workouts = async (req: Request, res: Response) => {
    try {
        const workouts = await Workout.find({
            relations: ['trainee', 'coach', 'includes', 'includes.exercise', 'includes.sets']
        });

        // Map the workouts to include the exercise and sets data
        const mappedWorkouts = workouts.map(workout => ({
            id: workout.id,
            name: workout.name,
            duration: workout.duration,
            trainee: workout.trainee ? {
                id: workout.trainee.id,
                firstName: workout.trainee.firstName,
                lastName: workout.trainee.lastName,
                username: workout.trainee.username,
                email: workout.trainee.email,
                dateOfBirth: workout.trainee.dateOfBirth,
                gender: workout.trainee.gender,
                age: workout.trainee.age,
                weight: workout.trainee.weight,
                height: workout.trainee.height,
            } : null,
            coach: workout.coach ? {
                id: workout.coach.id,
                firstName: workout.coach.firstName,
                lastName: workout.coach.lastName,
                username: workout.coach.username,
                email: workout.coach.email,
                userRole: workout.coach.userRole,
                dateOfBirth: workout.coach.dateOfBirth,
                gender: workout.coach.gender,
                age: workout.coach.age,
                yearsOfExperience: workout.coach.yearsOfExperience,
                certificate: workout.coach.certificate,
            } : null,
            includes: workout.includes.map(includes => ({
                id: includes.id,
                exercise: includes.exercise ? {
                    id: includes.exercise.id,
                    name: includes.exercise.name,
                    type: includes.exercise.type,
                    muscle: includes.exercise.muscle,
                    equipment: includes.exercise.equipment,
                    difficulty: includes.exercise.difficulty,
                    instructions: includes.exercise.instructions,
                    imagePath: includes.exercise.imagePath,
                    sets: includes.sets.map(set => ({
                        id: set.id,
                        setNumber: set.setNumber,
                        weight: set.weight,
                        reps: set.reps,
                        done: set.done,
                    }))
                } : null,
            })),
        }));

        return res.status(200).json(mappedWorkouts);
    } catch (error) {
        console.error('Error retrieving workouts:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const s_get_workout = async (req: Request, res: Response) => {
    console.log(req.params);
    const exercise_id: string = req.params.id;
    const id: number = +exercise_id; // Convert string to number using the unary plus operator

    try {
        const exercise = await Workout.findOne({ where: { id } }); // Use the converted number as ID

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        return res.status(200).json(exercise);
    } catch (error) {
        console.error('Error retrieving exercise:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const s_delete_workout = async (req: Request, res: Response) => {
    console.log(req.params);
    const exercise_id: string = req.params.id;
    const id: number = +exercise_id; // Convert string to number using the unary plus operator

    try {
        const exercise = await Workout.findOne({ where: { id } });

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        await Workout.remove(exercise);
        
        return res.status(200).json({ message: 'Exercise deleted' });
    } catch (error) {
        console.error('Error deleting exercise:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const s_update_workout = async (req: Request, res: Response) => {
    console.log(req.params)
    console.log(req.body)
    const exercise_id: string = req.params.id;
    const id: number = +exercise_id; // Convert string to number using the unary plus operator
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
        const updatedExercise = await Workout.update({ id }, updateFields);

        return res.status(200).json(updatedExercise);
    } catch (error: any) {
        console.error('Error updating exercise:', error);
        return res.status(500).json({ error: error.message }); // Handle error appropriately
    }
};