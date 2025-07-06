import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        success: false,
        error: errorMessage,
      });
    }

    next();
  };
};

export const validateParams = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        success: false,
        error: errorMessage,
      });
    }

    next();
  };
};
