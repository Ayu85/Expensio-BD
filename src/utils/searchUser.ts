import { json, Request, Response } from "express";
import userModel from "../models/user.model";

export const searchUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const user = await userModel.findOne({ username })
        if (user)
            return true
        return false
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", success: false })
    }
}