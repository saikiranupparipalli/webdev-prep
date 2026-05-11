import ApiError from "../../common/utils/api-error.js"
import generateToken from "../../common/utils/jwt.js"
import User from "./auth.model.js"

const userInfo = ({name, email, password, role})=>{
    const userExist = await User.findOne({email})
    if(userExist){
        throw ApiError.confilct("user already exists")
    }
 const {rawToken, hashToken} = generateToken()

    const user = await User.create({
        name,
        email,
        password,
        role
    })
}

export default userInfo