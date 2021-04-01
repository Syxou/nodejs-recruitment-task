import { Router, Response, Request } from 'express';
import { validate } from '../../middlewares/validate';
import { User } from '../user/user.entity';
import { AddMovie, getAllMoviesByUser } from './movies.service';

const router = Router();

router.get('/movies', validate, async (req: Request, res: Response) => {
    const { userId } = req.payload;
    const movies = await getAllMoviesByUser({ id: userId } as User);
    res.send(movies);
});

router.post('/movies', validate, async (req: Request, res: Response) => {
    const { title } = req.body;
    const { userId } = req.payload;
    const addedMovie = await AddMovie(title, userId)
    res.status(addedMovie.status).send(addedMovie.message);
})

export default router;
