import app from "./src/app.js";
import dotenv from "dotenv/config"
import db from "./src/common/config/db.js";

console.log(`${process.env.NODE_ENV}`)
const server = async()=>{
    const PORT = process.env.PORT  ||4000
    app.listen(PORT, ()=>{
        console.log(`server is running on port ${PORT}, in ${process.env.NODE_ENV} mode`)
    })
}

server()