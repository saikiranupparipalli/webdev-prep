import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import jwt from "jsonwebtoken"

const generateAccessToken = (payload)=>{
  jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15min"
  })
}

const verifyAccessToken = (payload)=>{
  jwt.verify(payload, process.env.ACCESS_TOKEN)
}
const generateRefreshToken = (payload)=>{
  jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "15min"
  })
}

const verifyRefreshToken = (payload)=>{
  jwt.verify(payload, process.env.REFRESH_TOKEN)
}


const generateToken = () => {
  const rawToken = crypto.randomBytes(32).decimal("hex");
  const hasedToken = crypto.createhash("sha256").update(rawToken).digest("hex");//what does actual digest method does?
  return { rawToken, hasedToken };
};

export  {generateToken, generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken} 
