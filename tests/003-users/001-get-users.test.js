import test from "tape"
import request from "supertest"

import { app, server } from "../../src/index.js"

test('GET /users  -- Endpoint is secured', assert => {
    let R = request(app)

    R.get('/users')
        .expect(401)
        .then(() => assert.pass('Endpoint is secured'))
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})


test('GET /users', assert => {
    let R = request(app)

    R.post('/token')
        .send({
            email: "britneyblankenship@quotezart.com",
            password: "a0ece5db-cd14-4f21-812f-966633e7be86"
        })
        .expect(201)
        .then(res => R.get('/users')
            .auth(res.body.token, { type: 'bearer' })
            .expect(200)
        )
        .then(() => assert.pass('Can get users'))
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})

test('GET /users -- Filter by name', assert => {
    let R = request(app)

    R.post('/token')
        .send({
            email: "britneyblankenship@quotezart.com",
            password: "a0ece5db-cd14-4f21-812f-966633e7be86"
        })
        .expect(201)
        .then(res => R.get('/users?name=br')
            .auth(res.body.token, { type: 'bearer' })
            .expect(200)
        )
        .then(res => {
            assert.deepEqual(
                res.body[0],
                {
                    "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
                    "name": "Britney",
                    "email": "britneyblankenship@quotezart.com",
                    "role": "admin"
                },
                "Filter by name is working"
            )
        })
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})

test('GET /users -- Filter by policy', assert => {
    let R = request(app)

    R.post('/token')
        .send({
            email: "britneyblankenship@quotezart.com",
            password: "a0ece5db-cd14-4f21-812f-966633e7be86"
        })
        .expect(201)
        .then(res => R.get('/users?policyId=7b624ed3-00d5-4c1b-9ab8-c265067ef58b')
            .auth(res.body.token, { type: 'bearer' })
            .expect(200)
        )
        .then(res => {
            assert.deepEqual(
                res.body[0],
                {
                    "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
                    "name": "Britney",
                    "email": "britneyblankenship@quotezart.com",
                    "role": "admin"
                },
                "User can be found by suppling a policy"
            )
        })
        .catch(() => assert.fail())
        .finally(() => {
            server.close()
            assert.end()
        })
})