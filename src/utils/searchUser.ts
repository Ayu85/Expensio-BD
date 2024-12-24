import { json, Request, Response } from "express";
import userModel from "../models/user.model";
declare global {
    namespace Express {
      interface Request {
        user?: any; // Define the user type if possible (e.g., IUser)
      }
    }
  }
export const searchUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const user = await userModel.findOne({ username })
        if (user) {
            req.user = user;
            return true
        }
        return false
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", success: false })
    }
}