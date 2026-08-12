import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import ConnectDB from './config/mongoose.connection.js'
const PORT = process.env.PORT;
const app = express()
app.use(cors())
app.use(express.json())
await ConnectDB()








app.listen(PORT , ()=>{
      console.log(`orders backend is running on PORT ${PORT}`)
})