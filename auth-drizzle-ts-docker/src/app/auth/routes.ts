 import { Router , type Router as typeRouter} from "express";
import { Authcontroller } from "./controller.js";
 

export const authRouter:typeRouter = Router()

const authController = new Authcontroller()

authRouter.post('/sign-up', authController.signUp.bind(authController))

authRouter.post('/sign-in', )