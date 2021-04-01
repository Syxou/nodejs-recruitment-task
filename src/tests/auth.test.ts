import { disconnect } from 'process';
import * as request from 'supertest';
import app from '../app';

const res = request(app);

describe("POST /auh", () => {
    test("should Bad Request", async (done) => {
        res.post('/auth')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                done()
            })
    });

    test("should Bad Request", async (done) => {
        res.post('/auth')
            .send({ username: "fake", password: 'fake' })
            .expect(400)
            .end(() => {
                done();
            })
    })
});