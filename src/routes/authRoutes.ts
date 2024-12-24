import { Request, Response, Router } from "express";
import { login, register } from "../controllers/authControllers";

const router = Router()
router.post('/register', (req: Request, res: Response) => {
    register(req, res)
})
router.post('/login', (req: Request, res: Response) => {
    login(req, res)
})

export default router