import app from './app';

const { APP_PORT } = process.env;

const PORT = APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`auth svc running at port ${PORT}`);
});
