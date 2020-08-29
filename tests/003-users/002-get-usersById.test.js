import test from "tape"
import request from "supertest"

import { app, server } from "../../src/index.js"

test('GET /users/:id  -- Endpoint is secured', assert => {
    let R = request(app)

    R.get('/users/a0ece5db-cd14-4f21-812f-966633e7be86')
        .expect(401)
        .then(() => assert.pass('Endpoint is secured'))
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})

test('GET /users/:id', assert => {
    let R = request(app)

    R.post('/token')
        .send({
            email: "britneyblankenship@quotezart.com",
            password: "a0ece5db-cd14-4f21-812f-966633e7be86"
        })
        .expect(201)
        .then(res => R.get('/users/a0ece5db-cd14-4f21-812f-966633e7be86')
            .auth(res.body.token, { type: 'bearer' })
            .expect(200)
        )
        .then(() => assert.pass('User found'))
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})

test('GET /users/:id  -- Not Found', assert => {
    let R = request(app)

    R.post('/token')
        .send({
            email: "britneyblankenship@quotezart.com",
            password: "a0ece5db-cd14-4f21-812f-966633e7be86"
        })
        .expect(201)
        .then(res => R.get('/users/0000000-0000-0000-0000-3761b604800')
            .auth(res.body.token, { type: 'bearer' })
            .expect(404)
        )
        .then(() => assert.pass('Not Found'))
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})