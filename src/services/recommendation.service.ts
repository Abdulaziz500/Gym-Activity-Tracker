import { Request, Response } from "express";
import axios from 'axios';
import { Recommendations } from "../entities/recommendation.entity";

export const s_create_recommendation = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const {leanBodyMassLeftArm,
            leanBodyMassPercentLeftArm,
            leanBodyMassRightArm,
            leanBodyMassPercentRightArm,
            leanBodyMassLeftLeg, 
            leanBodyMassPercentLeftLeg,
            leanBodyMassRightLeg,
            leanBodyMassPercentRightLeg, 
            leanBodyMassTrunk,
            leanBodyMassPercentTrunk,
            traineeId} = req.body;

        const url = "http://127.0.0.1:5004/create_recommendation"

        // Send POST request to Flask endpoint
        const response = await axios.post(url, req.body);

        console.log('Response from Flask:', response.data);

        const predicted_recommendation = response.data.predicted_recommendation[0];
        console.log('Predicted recommendation:', predicted_recommendation);

        let bodyPart = '';

        if(predicted_recommendation === 0){
            bodyPart = 'Left Arm'; 
        }else if(predicted_recommendation === 1){
            bodyPart = "Right Arm";
        }else if(predicted_recommendation === 2){
            bodyPart = "Left Leg";
        }else if(predicted_recommendation === 3){
            bodyPart = "Right Leg";
        }else if(predicted_recommendation === 4){
            bodyPart = "Trunk";
        }

        //save to database
        const newRecommendation = await Recommendations.save({
            leanBodyMassLeftArm:leanBodyMassLeftArm,
            leanBodyMassPercentLeftArm:leanBodyMassPercentLeftArm,
            leanBodyMassRightArm:leanBodyMassRightArm,
            leanBodyMassPercentRightArm:leanBodyMassPercentRightArm,
            leanBodyMassLeftLeg:leanBodyMassLeftLeg, 
            leanBodyMassPercentLeftLeg:leanBodyMassPercentLeftLeg,
            leanBodyMassRightLeg:leanBodyMassRightLeg,
            leanBodyMassPercentRightLeg:leanBodyMassPercentRightLeg, 
            leanBodyMassTrunk:leanBodyMassTrunk,
            leanBodyMassPercentTrunk:leanBodyMassPercentTrunk,
            recommendedBodyPart:bodyPart,
            trainee: traineeId
        })

        return bodyPart;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
