import { Request, Response, Router } from "express";
import { check, login, register } from "../controllers/authControllers";

const router = Router()
router.post('/register', (req: Request, res: Response) => {
    register(req, res)
})
router.post('/login', (req: Request, res: Response) => {
    login(req, res)
})
router.get('/check', (req: Request, res: Response) => {
    check(req, res)
})

export default router