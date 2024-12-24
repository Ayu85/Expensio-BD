import express from 'express'
import dotenv from 'dotenv'
import connectDb from './lib/db'
import authRouter from './routes/authRoutes'
dotenv.config()
const PORT = process.env.PORT
const app = express()
connectDb()
app.use(express.json())
app.use('/api/v1/auth',authRouter)






app.listen(PORT, () => {
    console.log(`Server Running On PORT ${PORT}`);

})