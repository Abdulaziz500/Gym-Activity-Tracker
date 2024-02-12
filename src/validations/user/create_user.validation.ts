import { check } from "express-validator";

export const create_user_validation = () => {
    return [
        check("name").exists().withMessage("name is required")
        .isLength({min:5,max:40}).withMessage("name must be between 5 and 40 characters"),
        check("email").isEmail().withMessage("email is not valid"),
        check("age").isNumeric().withMessage("age should be number")
    ]
}