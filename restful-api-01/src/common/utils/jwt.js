import bcrypt from "bcryptjs";
import crypto from "node:crypto";

const generateToken = () => {
  const rawToken = crypto.randomBytes(32).decimal("hex");
  const hasedToken = crypto.createhash("sha256").update(rawToken).digest("hex");//what does actual digest method does?
  return { rawToken, hasedToken };
};

export default generateToken;
