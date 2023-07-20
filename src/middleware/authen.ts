import { User } from "../models/user";
import { verifyToken } from "../helpers/jwt";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ExpressRequest extends Request {
  user: {
    id?: number;
    email?: string;
  };
}

interface JwtPaylodIF extends JwtPayload {
  id: number;
  email: string;
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestUser = req as ExpressRequest;
  try {
    const access_token = req.headers.access_token as string;
    // eslint-disable-next-line
    if (!access_token) {
      throw { name: "InvalidToken" };
    }
    const payload = verifyToken(access_token) as JwtPaylodIF;
    const user = await User.findByPk(payload.id);

    requestUser.user = {
      id: user?.id,
      email: user?.email,
    };
    next();
  } catch (error) {
    if (["JsonWebTokenError", "InvalidToken"].includes((error as Error).name)) {
      res.status(401).json({ message: "invalid token" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
