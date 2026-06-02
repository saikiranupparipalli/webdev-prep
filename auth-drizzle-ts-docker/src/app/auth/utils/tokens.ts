import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface userToken {
  id: string;
}

export const accessToken = (payload: userToken) => {
 return jwt.sign(payload, process.env.ACCESS_TOKEN!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "5min",
  });
};

export const refresToken = (payload: userToken) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  });
};

export const verifyAccessToken = (token:string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN!);
};

export const verifyRefreshToken = (token:string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN!);
};
 