import {validationResult} from "express-validator";

export const handleResult = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty())
        return next();
    
    res.status(400).json({message: errors.array()});
};
