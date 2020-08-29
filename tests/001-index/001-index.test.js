import test from "tape"
import request from "supertest"

import { app, server } from "../../src/index.js"

test('GET /', assert => {
    request(app)
        .get('/')
        .expect(200)
        .then(
            res => {
                assert.ok(res.text, 'Server up!')
            }
        )
        .finally(() => {
            server.close()
            assert.end()
        })
})