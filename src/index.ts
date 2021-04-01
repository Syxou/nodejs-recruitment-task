import 'reflect-metadata';
import app from './app';
import connect from './connect';

const { APP_PORT } = process.env;

const PORT = APP_PORT || 3000;

connect.run()
    .then(() => console.log('db connected'))
    .catch((e) => console.log('db was not connected', e));

app.listen(PORT, () => {
    console.log(`auth svc running at port ${PORT}`);
});
