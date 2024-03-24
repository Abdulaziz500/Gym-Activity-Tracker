import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Exercise } from '../entities/exercise.entity';

export const save_exercise_images_router = express.Router();

// Route to save exercise images to the database
save_exercise_images_router.post('/save-exercise-images', async (req: Request, res: Response) => {
    try {
        // Read images from the 'imgs' folder
        const imgsFolderPath = '/Users/abdullazizalhamlan/Gym-Activity-Tracker/public/imgs';
        const imagePaths = readImagesFromFolder(imgsFolderPath);

        // Call the saveImagesToDatabase function to save images for existing exercises
        await saveImagesToDatabase(imagePaths);

        res.status(200).json({ message: 'Exercise images saved successfully' });
    } catch (error) {
        console.error('Error saving exercise images:', error);
        res.status(500).json({ error: 'Failed to save exercise images' });
    }
});

// Function to read images from the 'imgs' folder
function readImagesFromFolder(folderPath: string): string[] {
    try {
        const files = fs.readdirSync(folderPath);
        const imagePaths = files.filter(file => {
            const extension = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension);
        }).map(file => path.join(folderPath, file));
        return imagePaths;
    } catch (error) {
        console.error('Error reading images from folder:', error);
        throw error;
    }
}


// Function to save images to the database for existing exercises
export async function saveImagesToDatabase(imagePaths: string[]) {
    try {
        for (const imagePath of imagePaths) {
            const { name: imageNameWithoutExt } = path.parse(imagePath); // Extract the image name without extension

            // Find the exercise by name
            const exercise = await Exercise.findOne({ where: { name: imageNameWithoutExt } });

            // If exercise found, update its image path
            if (exercise) {
                exercise.imagePath = imagePath;
                await exercise.save(); // Save the exercise entity with updated image path
                console.log(`Image saved for exercise "${imageNameWithoutExt}"`);
            } else {
                console.warn(`Exercise "${imageNameWithoutExt}" not found`);
            }
        }
        console.log('Images saved to database for existing exercises successfully');
    } catch (error) {
        console.error('Error saving images to database for existing exercises:', error);
        throw error;
    }
}