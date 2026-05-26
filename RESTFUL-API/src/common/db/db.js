import mongoose from "mongoose"

const connectdB = async () => {
  const connect = await mongoose.connect(process.env.MONGODB_URI)
  console.log("ENV CHECK:", process.env.MONGODB_URI)
  console.log(`MongooseDb connected ${connect.connection.host}`)

}
export default connectdB
