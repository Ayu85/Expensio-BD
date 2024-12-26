import { Request, Response } from "express";
import { searchUser } from "../utils/searchUser";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password, fullname, upi, income } = req.body;
        if (!username || !password || !fullname || !upi || !income)
            return res.status(400).json({ message: "Missing fields!!", success: false })
        const doesUserExists = await searchUser(req, res)
        if (doesUserExists)
            return res.status(400).json({ message: "User already exists", success: false })
        const passwordHash = await bcrypt.hash(password, 10)
        const user = await userModel.create({ username, password: passwordHash, fullname, upi, income })
        if (user)
            res.status(200).json({
                message: "User Created!!", success: true, user: {
                    username: user.username,
                    fullname: user.fullname,
                    income: user.income,
                    upi: user.upi
                }
            })
        return res.status(400).json({ message: "Internal Server Error", success: false })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Something went wrong!!", success: false })

    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const doesUserExists = await searchUser(req, res)
        if (!doesUserExists)
            return res.status(400).json({ msg: "User not found!!", success: false })
        const user = req.user
        const secret = process.env.JWT_SECRET
        if (!secret)
            return res.status(400).json({ message: "No JWT_SECRET provided" })
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword)
            return res.status(400).json({ message: "Invalid Password", success: false })
        const token = jwt.sign({ username }, secret)
        return res.cookie('token', token, { httpOnly: true, secure: true })
            .json({
                message: "User Logged In!!", success: true, user: {
                    username: user.username,
                    fullname: user.fullname,
                    income: user.income,
                    upi: user.upi
                }
            })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!!", success: false })

    }
}
interface DecodedToken {
    username: string;
    // Add other fields if your JWT contains more information
}
export const check = async (req: Request, res: Response) => {
    try {
        const { token } = req.cookies
        if (!token)
            return res.status(401).json({ message: "Unauthorised:No token provided!!", success: false })
        const secret = process.env.JWT_SECRET
        if (!secret)
            return res.status(401).json({ message: "missing jwt secret!!", success: false })
        const decoded = jwt.verify(token, secret) as DecodedToken;
        console.log(decoded);
        
        const username = decoded.username
        const user = await userModel.findOne({ username }).select('-password')
        return res.status(200).json({ success: true, user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!!", success: false })

    }
}