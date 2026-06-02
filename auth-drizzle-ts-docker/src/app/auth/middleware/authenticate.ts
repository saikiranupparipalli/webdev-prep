import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, type userToken } from "../utils/tokens.js";

export const authenticateUser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) return res.status(404).json({ message: `header not found` });

    const token = header.split(" ")[1];

    if (!token) return res.status(404).json({ message: `token not found` });

    const user = verifyAccessToken(token) as userToken;

    if (!user)
      return res.status(400).json({ message: `invalid token, user not found` });

    req.id = user;

    next();
  };
};
