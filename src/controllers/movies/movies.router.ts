import { Router, Response, Request } from 'express';
import { validate } from '../../middlewares/validate';
import { getAllMovies } from './movies.service';

const router = Router();

router.get('/movies', validate, async (req: Request, res: Response) => {
    res.send(await getAllMovies());
});

router.post('/movies', async (req: Request, res: Response) => {
    res.send('post')
})

export default router;