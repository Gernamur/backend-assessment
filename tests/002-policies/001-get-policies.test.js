import test from "tape"
import request from "supertest"

import { app, server } from "../../src/index.js"

test('GET /policies  -- Endpoint is secured', assert => {
    let R = request(app)

    R.get('/policies')
        .expect(401)
        .then(() => assert.pass('Endpoint is secured'))
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})

test('GET /policies  -- Admin can access', assert => {
    let R = request(app)

    R.post('/token')
        .send({
            email: "britneyblankenship@quotezart.com",
            password: "a0ece5db-cd14-4f21-812f-966633e7be86"
        })
        .expect(201)
        .then(res => R.get('/policies')
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

test('GET /policies  -- Non Admin access is forbidden', assert => {

    let R = request(app)

    R.post('/token')
        .send({
            email: "barnettblankenship@quotezart.com",
            password: "a3b8d425-2b60-4ad7-becc-bedf2ef860bd"
        })
        .expect(201)
        .then(res => R.get('/policies')
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