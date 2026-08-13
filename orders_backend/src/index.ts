import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import ConnectDB from './config/mongoose.connection.js'
import logger from './utils/log.configuration.js'
import product_router from './routes/products.routes.js'
import inventory_router from './routes/inventory.routes.js'
import orders_router from './routes/orders.routes.js'
const PORT = process.env.PORT;
const app = express()
app.use(cors())
app.use(express.json())
await ConnectDB()



app.use('/api/products' , product_router)
app.use('/api/inventory' , inventory_router)
app.use('/api/orders' , orders_router)


app.get('/health' , (req,res)=>{
       return res.status(200).json({
           message : 'Orders backend is healthy'
       })
})

app.listen(PORT , ()=>{
     logger.info(`orders backend is running on PORT ${PORT}`)
})