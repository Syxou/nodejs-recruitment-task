import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

import options from './swagger';
import moviesRouter from './controllers/movies/movies.router';
import authRouter from './controllers/auth/auth.router';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(moviesRouter);
app.use(authRouter);

const specs = swaggerJsdoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));


app.use((error: express.ErrorRequestHandler, _: any, res: express.Response, __: any) => {
    console.error(
        `Error processing request ${error}. See next message for details`
    );
    console.error(error);

    return res.status(500).json({ error: "internal server error" });
});

export default app;