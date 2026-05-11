import dotenv from "dotenv/config"
import app from "./src/app.js"
import db from "./src/common/config/db.js"

const PORT = process.env.PORT || 8080

const server = async()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running on ${PORT} port in ${process.env.NODE_ENV} mode`)
    })
}

server()

