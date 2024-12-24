import { Request, Response, Router } from "express";
import { register } from "../controllers/authControllers";

const router = Router()
router.post('/register', (req: Request, res: Response) => {
    register(req, res)
})

export default router