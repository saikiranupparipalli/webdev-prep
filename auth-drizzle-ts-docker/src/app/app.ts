import express from "express"
import dotenv from "dotenv"
import type{Express} from "express"
import { authRouter } from "./auth/routes.js"
 

dotenv.config()

export function createApp():Express{
    const app = express()
    app.use(express.json())

    app.use('/auth', authRouter)
    return app
}
