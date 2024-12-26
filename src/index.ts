import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './lib/db'
import authRouter from './routes/authRoutes'
import cookieParser from 'cookie-parser'
dotenv.config()
const PORT = process.env.PORT
const app = express()
connectDb()
app.use(cors({
    origin: 'http://localhost:5173', credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/v1/auth', authRouter)






app.listen(PORT, () => {
    console.log(`Server Running On PORT ${PORT}`);

})