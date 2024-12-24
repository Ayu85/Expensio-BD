import { Request, Response } from "express";
import { searchUser } from "../utils/searchUser";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt'
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