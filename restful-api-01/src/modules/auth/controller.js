import * as service from "./service.js"
i
const register = async(req, res)=>{
    const user = await service.register(req.body)
    ApiResponse.create(res, "registered successfully", user)
}