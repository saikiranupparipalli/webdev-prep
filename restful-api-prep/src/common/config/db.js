import "dotenv/config"
import mongoose from "mongoose"

const db = async()=>{
    const con = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`mongodb is connected: ${process.env.MONGODB_URI}`)
}


db().catch((error)=>{
console.log("failed to -[CONNECT DB]..!", error)
process.exit(1)
})

export default db