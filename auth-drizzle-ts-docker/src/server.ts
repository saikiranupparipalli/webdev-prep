import http from "node:http"
import { createApp } from "./app/app.js"
import 'dotenv/config';
 import { db } from "./db/db.js";

 


 async function main(){
    const server = http.createServer(createApp())

    const PORT = process.env.PORT || 5000

    server.listen(PORT, ()=>{
        console.log(`server is running on port ${PORT}`)
    })
 }

 main()