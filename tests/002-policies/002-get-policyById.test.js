import test from "tape"
import request from "supertest"

import { app, server } from "../../src/index.js"

test('GET /policies/:id  -- Endpoint is secured', assert => {
    let R = request(app)

    R.get('/policies/6f514ec4-1726-4628-974d-20afe4da130c')
        .expect(401)
        .then(() => assert.pass('Endpoint is secured'))
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})


test('GET /policies/:id  -- Admin can access', assert => {
    let R = request(app)

    R.post('/token')
        .send({
            email: "britneyblankenship@quotezart.com",
            password: "a0ece5db-cd14-4f21-812f-966633e7be86"
        })
        .expect(201)
        .then(res => R.get('/policies/6f514ec4-1726-4628-974d-20afe4da130c')
            .auth(res.body.token, { type: 'bearer' })
            .expect(200)
        )
        .then(() => assert.pass('Admin can access'))
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})

test('GET /policies/:id  -- Non Admin access is forbidden', assert => {

    let R = request(app)

    R.post('/token')
        .send({
            email: "barnettblankenship@quotezart.com",
            password: "a3b8d425-2b60-4ad7-becc-bedf2ef860bd"
        })
        .expect(201)
        .then(res => R.get('/policies/64cceef9-3a01-49ae-a23b-3761b604800')
            .auth(res.body.token, { type: 'bearer' })
            .expect(403)
        )
        .then(() => assert.pass('Non Admin access is forbidden'))
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})

test('GET /policies/:id  -- Not Found', assert => {
    let R = request(app)

    R.post('/token')
        .send({
            email: "britneyblankenship@quotezart.com",
            password: "a0ece5db-cd14-4f21-812f-966633e7be86"
        })
        .expect(201)
        .then(res => R.get('/policies/0000000-0000-0000-0000-3761b604800')
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