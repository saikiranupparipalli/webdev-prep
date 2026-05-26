import User from "./model.js";
import ApiError from "../../common/utils/api-errors.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
} from "../../common/utils/jwt.js";

const register = async (name, email, password, role) => {
  const user = await User.findOne({ email });
  if (user) throw ApiError.badReq("user already exists");

  const { accessToken, refreshToken } = generateToken();

  const hashToken = crypto.createhash("sha256").update(refreshToken);

  const newUser= await user.create({
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
    verificationToken: hashToken,
  });

//   const toObj = user.toObject({
//     name,
//     email,
//     accessToken
//   })
 

//sendemail
};

export {register}