import { Request, Response } from "express";
import { Exercise } from "../entities/exercise.entity";
import { Includes } from "../entities/includes.entity";
import { Sets } from "../entities/sets.entity";
import { Workout } from "../entities/workout.entity";

export const s_create_workout = async (req: Request, res: Response) => {
    console.log("begin----req.body-------------------")
    console.log(req.body)
    console.log("end------req.body-------------------")
  try {
    const { name, user, duration, includes } = req.body;

    // Create the workout instance
    const workout = new Workout();
    workout.name = name;
    workout.duration = duration;

    if(user.userRole === "trainee"){
        workout.trainee = user;

    }else if(user.userRole === "coach"){
        workout.coach = user;
    }

    const includesEntries: Includes[] = [];
    const setsEntries: Sets[] = [];

    // Link existing exercises to the workout and save sets
    for (const includedExercise of includes) {
      // Assuming includedExercise.name is the name of the pre-stored exercise
      const exercise = await Exercise.findOne({ where: { name: includedExercise.name } });
      if (exercise) {
        const includesEntry = new Includes();
        includesEntry.workout = workout;
        includesEntry.exercise = exercise;
        includesEntries.push(includesEntry);
        

        // Save sets for the included exercise
        for (const set of includedExercise.sets) {
            // Convert setNumber to integer
            set.setNumber = parseInt(set.setNumber);

            // Convert weight and reps to integers, or default to 0 if empty string
            set.weight = set.weight !== '' ? parseInt(set.weight) : 0;
            set.reps = set.reps !== '' ? parseInt(set.reps) : 0;
            
            console.log("weight:");
            console.log(set.weight);
            console.log("reps:");
            console.log(set.reps);
            // Exclude sets with done value of false or reps equal to 0 (trainee didn't finish the set)
            if (set.done && set.reps > 0 ) {
                console.log("set begin inside if--------------------------------------")
                console.log(set)
                console.log("set end inside if--------------------------------------")
                const setsEntry = new Sets();
                setsEntry.includes = includesEntry;
                setsEntry.setNumber = set.setNumber;
                setsEntry.weight = set.weight;
                setsEntry.reps = set.reps
                setsEntry.done = set.done;
                console.log("setsEntry begin inside if--------------------------------------")
                console.log(setsEntry)
                console.log("setsEntry end inside if--------------------------------------")
                setsEntries.push(setsEntry);
            }else{
                console.log("Set not saved due to invalid data:", set);
            }
            console.log("setsEntries begin after loops--------------------------------------")
            console.log(setsEntries)
            console.log("setsEntries end after loops--------------------------------------")
        }


      } else {
        console.warn(`Exercise "${includedExercise.name}" not found in the database.`);
      }

    }


    // Save the workout to the database
    try {
        await workout.save();
    } catch (error) {
        console.error('Error saving workout:', error);
        throw error; // Rethrow the error to halt further execution
    }

    // Save all includes entries
    try {
        await Promise.all(includesEntries.map(entry => entry.save()));
    } catch (error) {
        console.error('Error saving includes entries:', error);
        throw error; // Rethrow the error to halt further execution
    }

    // Save all sets entries
    try {
        await Promise.all(setsEntries.map(entry => entry.save()));
    } catch (error) {
        console.error('Error saving sets entries:', error);
        throw error; // Rethrow the error to halt further execution
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
                userRole: workout.trainee.userRole,
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




// interface Includes2 {
//     id: number;
//     exercise: {
//         id: number;
//         name: string;
//         type: string;
//         muscle: string;
//         equipment: string;
//         difficulty: string;
//         instructions: string;
//         imagePath: string;
//         sets: {
//             id: number;
//             setNumber: number;
//             weight: number;
//             reps: number;
//             done: boolean;
//         }[];
//     } | null;
// }

// interface Sets2 {
//     id: number;
//     setNumber: number;
//     weight: number;
//     reps: number;
//     done: boolean;
// }

// export const s_get_trainee_workouts = async (req: Request, res: Response) => {
//     try {
//         const userId = req.params.userId;
//         const userRole = req.params.userRole;

//         let workouts: any[] = [];

//         if (userRole === "trainee") {
//             workouts = await Workout.find({
//                 where: { trainee: { id: +userId } },
//                 relations: ['trainee', 'coach', 'includes', 'includes.exercise', 'includes.sets']
//             });
//         } else if (userRole === "coach") {
//             workouts = await Workout.find({
//                 where: { coach: { id: +userId } },
//                 relations: ['trainee', 'coach', 'includes', 'includes.exercise', 'includes.sets']
//             });
//         }

//         // Map the workouts to include the exercise and sets data
//         const mappedWorkouts = workouts.map(workout => ({
//             id: workout.id,
//             name: workout.name,
//             duration: workout.duration,
//             trainee: workout.trainee ? {
//                 id: workout.trainee.id,
//                 firstName: workout.trainee.firstName,
//                 lastName: workout.trainee.lastName,
//                 username: workout.trainee.username,
//                 email: workout.trainee.email,
//                 dateOfBirth: workout.trainee.dateOfBirth,
//                 userRole: workout.trainee.userRole,
//                 gender: workout.trainee.gender,
//                 age: workout.trainee.age,
//                 weight: workout.trainee.weight,
//                 height: workout.trainee.height,
//             } : null,
//             coach: workout.coach ? {
//                 id: workout.coach.id,
//                 firstName: workout.coach.firstName,
//                 lastName: workout.coach.lastName,
//                 username: workout.coach.username,
//                 email: workout.coach.email,
//                 userRole: workout.coach.userRole,
//                 dateOfBirth: workout.coach.dateOfBirth,
//                 gender: workout.coach.gender,
//                 age: workout.coach.age,
//                 yearsOfExperience: workout.coach.yearsOfExperience,
//                 certificate: workout.coach.certificate,
//             } : null,
//             includes: workout.includes?.map((include: Includes2) => ({
//                 id: include.id,
//                 exercise: include.exercise ? {
//                     id: include.exercise.id,
//                     name: include.exercise.name,
//                     type: include.exercise.type,
//                     muscle: include.exercise.muscle,
//                     equipment: include.exercise.equipment,
//                     difficulty: include.exercise.difficulty,
//                     instructions: include.exercise.instructions,
//                     imagePath: include.exercise.imagePath,
//                     sets: include.exercise.sets?.map((set: Sets2) => ({
//                         id: set.id,
//                         setNumber: set.setNumber,
//                         weight: set.weight,
//                         reps: set.reps,
//                         done: set.done,
//                     })) || [] // Provide an empty array if include.exercise.sets is undefined
//                 } : null,
//             })) || [], // Provide an empty array if workout.includes is undefined,
//         }));

//         return res.status(200).json(mappedWorkouts);
//     } catch (error) {
//         console.error('Error retrieving workouts:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };









export const s_get_trainee_workouts = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userRole = req.params.userRole;


        if (userRole === "trainee") {
            const workouts = await Workout.find({
                where: { trainee: { id: +userId } },
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
                    userRole: workout.trainee.userRole,
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
                includes: workout.includes?.map(includes => ({
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
                }))
            }));

            return res.status(200).json(mappedWorkouts);

        } else if (userRole === "coach") {
            const workouts = await Workout.find({
                where: { coach: { id: +userId } },
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
                    userRole: workout.trainee.userRole,
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
                includes: workout.includes?.map(includes => ({
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
                }))
            }));

            return res.status(200).json(mappedWorkouts);
        }
    } catch (error) {
        console.error('Error retrieving workouts:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};















export const s_get_workout = async (req: Request, res: Response) => {
    try {
        const workoutId = req.params.id; // Assuming the workout ID is passed as a route parameter

        const workout = await Workout.find({
            where: { id: +workoutId },
            relations: ['trainee', 'coach', 'includes', 'includes.exercise', 'includes.sets']
        });
        
        if (!workout || workout.length === 0) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        const mappedWorkout = {
            id: workout[0].id,
            name: workout[0].name,
            duration: workout[0].duration,
            trainee: workout[0].trainee ? {
                id: workout[0].trainee.id,
                firstName: workout[0].trainee.firstName,
                lastName: workout[0].trainee.lastName,
                username: workout[0].trainee.username,
                email: workout[0].trainee.email,
                dateOfBirth: workout[0].trainee.dateOfBirth,
                userRole: workout[0].trainee.userRole,
                gender: workout[0].trainee.gender,
                age: workout[0].trainee.age,
                weight: workout[0].trainee.weight,
                height: workout[0].trainee.height,
            } : null,
            coach: workout[0].coach ? {
                id: workout[0].coach.id,
                firstName: workout[0].coach.firstName,
                lastName: workout[0].coach.lastName,
                username: workout[0].coach.username,
                email: workout[0].coach.email,
                userRole: workout[0].coach.userRole,
                dateOfBirth: workout[0].coach.dateOfBirth,
                gender: workout[0].coach.gender,
                age: workout[0].coach.age,
                yearsOfExperience: workout[0].coach.yearsOfExperience,
                certificate: workout[0].coach.certificate,
            } : null,
            includes: workout[0].includes.map(includes => ({
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
        };

        return res.status(200).json(mappedWorkout);
    } catch (error) {
        console.error('Error retrieving workout:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



export const s_delete_workout = async (req: Request, res: Response) => {
    try {
        const workoutId = req.params.id; // Assuming the workout ID is passed as a route parameter

        // Check if the workout exists
        const workout = await Workout.find({
            where: {id: +workoutId},  
            relations: ['includes'] 
        });

        if (!workout[0]) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        // Delete the workout and its related entities
        await workout[0].remove();

        console.log("Workout deleted successfully");
        return res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error('Error deleting workout:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};