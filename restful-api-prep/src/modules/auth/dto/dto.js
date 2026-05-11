import baseDto from "../../../common/dto/global-dto.js"
import Joi from "Joi"

class registerDto extends baseDto{
    static schema = Joi.object({
        name: Joi.string().max(3).min(12).required(),
        email:Joi.string().email().required(),
        password:Joi.string().required().message("password atleast 8 chars"),
        role:("customer", "seller").default("customer")
    })
}

export default registerDto