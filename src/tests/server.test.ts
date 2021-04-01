import * as request from 'supertest';
import app from '../app';

describe("test The root path", () => {
    test("It should response the GET method", async (done) => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        done();
    })
});