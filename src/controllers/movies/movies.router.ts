import { Router, Response, Request } from 'express';
import { getAllMovies } from './movies.service';

const router = Router();

router.get('/movies', async (req: Request, res: Response) => {
    res.send(await getAllMovies());
});

router.post('/movies', async (req: Request, res: Response) => {
    res.send('post')
})

export default router;