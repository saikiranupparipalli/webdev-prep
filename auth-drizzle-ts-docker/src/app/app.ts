import express from "express"
import dotenv from "dotenv"
import type{Express} from "express"

dotenv.config()

export function createApp():Express{
    const app = express()
    app.use(express.json())
    return app
}
