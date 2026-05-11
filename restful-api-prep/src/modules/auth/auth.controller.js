import userInfo from "./auth.service";
import Apiresponse from "../../common/utils/api-response.js"

const register = async() =>{
   const userData = await userInfo(req.body)
   Apiresponse.created(200, "registration is success", req.body)
}

export {register}