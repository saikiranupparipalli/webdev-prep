import mongoose from "mongoose"
 

const db =  async()=>{
   const connection =  await mongoose.connect(`${process.env.MONGODB_URI}`)
   console.log(`mongodb is connected on port ${process.MONGODB_URI}`, connection.connection.host)
    
}
 
export default db