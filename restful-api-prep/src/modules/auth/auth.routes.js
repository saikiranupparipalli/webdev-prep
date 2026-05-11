import {Router} from "express"
import validate from "../../common/middleware/global-middleware.js"
import registerDto from "./dto/dto.js"
import * as controller from "./auth.controller.js"

const route = Router()

route.post("/regiser", validate(registerDto), controller.register)