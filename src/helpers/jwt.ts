import jwt from "jsonwebtoken";
const secret = process.env.SECRET as string;

interface PayloadIF {
  id: number;
  email: string;
}

const createToken = (payload: PayloadIF) => jwt.sign(payload, secret);
const verifyToken = (token: string) => jwt.verify(token, secret);

export { createToken, verifyToken };
