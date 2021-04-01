import { Router, Response, Request, NextFunction } from 'express';
import { AuthError, auth } from './auth.service';

const router = Router();

router.post("/auth", async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    if (!req.body) {
        return res.status(400).json({ error: "invalid payload" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "invalid payload" });
    }

    try {
        const token = await auth(username, password);

        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(401).json({ error: error.message });
        }

        next(error);
    }
});

export default router;
