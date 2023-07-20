import { User } from "../../models/user";
import { Request, Response, NextFunction } from "express";
import { createToken } from "../../helpers/jwt";
import { compare } from "../../helpers/bcrypt";
import { ExpressRequest } from "../../middleware/authen";

export class Controller {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({ name, email, password });
      res.status(201).json({
        message: "Account has been created",
        data: {
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "EmailorPasswordRequired" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidCredential" };
      }
      const valid = compare(password, user.password);
      if (!valid) {
        throw { name: "InvalidCredential" };
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        message: "Seccess login",
        token: access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    const requestUser = req as ExpressRequest;
    try {
      const id = requestUser.user.id;
      const users = await User.findByPk(id, {
        attributes: {
          exclude: ["id", "password", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json({ message: "User's login informatin", data: users });
    } catch (error) {
      next(error);
    }
  }
}
