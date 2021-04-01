import * as express from 'express';
import * as dotenv from 'dotenv';
import * as swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import * as cors from 'cors'

import options from './swagger';
import moviesRouter from './controllers/movies/movies.router';
import authRouter from './controllers/auth/auth.router';

dotenv.config();
const app = express();

app.use(cors())
app.use(express.urlencoded());
app.use(express.json());

app.use(moviesRouter);
app.use(authRouter);

const specs = swaggerJsdoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

app.use((error: express.ErrorRequestHandler, _: any, res: express.Response, __: any) => {
    console.log(
        `Error processing request ${error}. See next message for details`
    );
    return res.status(500).json({ error: "internal server error" });
});

export default app;
