import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";

export const errorHandler = (
  // eslint-disable-next-line
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  _next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(400).json({
      message: err.errors[0].message,
    });
  } else if (err.name == "EmailorPasswordRequired") {
    res.status(400).json({
      message: "email or password required",
    });
  } else if (err.name == "InvalidCredential") {
    res.status(401).json({
      message: "email or password incorrrect",
    });
  } else {
    res.status(500).json({
      messsage: "Internal Server Error",
    });
  }
};
