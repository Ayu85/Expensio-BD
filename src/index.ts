import express from 'express'
import dotenv from 'dotenv'
import connectDb from './lib/db'
dotenv.config()
const PORT = process.env.PORT
const app = express()
connectDb()






app.listen(PORT, () => {
    console.log(`Server Running On PORT ${PORT}`);

})