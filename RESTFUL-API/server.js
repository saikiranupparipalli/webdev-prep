import "dotenv/config"
import app from "./src/app.js"
import connectdB from  "./src/common/db/db.js"



const PORT = process.env.PORT || 8080

const start = async () => {
  await connectdB()
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port in ${process.env.NODE_ENV}`)
  })
}
start()
