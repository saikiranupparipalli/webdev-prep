 import { Router , type Router as typeRouter} from "express";
import { Authcontroller } from "./controller.js";
import { authenticateUser } from "./middleware/authenticate.js";
 

export const authRouter:typeRouter = Router()

const authController = new Authcontroller()

authRouter.post('/sign-up', authController.signUp.bind(authController))

authRouter.post('/sign-in', authController.signIn.bind(authController))

authRouter.get('/me', authenticateUser(), authController.getMe.bind(authController) )