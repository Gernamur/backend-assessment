import jwt from 'jsonwebtoken'
import { created, notFound } from '../../responses.js'
import { to } from '../../await-to.js'

import { getUsers } from '../../services/users/getUsers.js'

/**
 * 
 * @api {post} /token
 * @apiGroup Token 
 * @apiName Post Token
 * 
 * @apiParam (Body) {String} email User email
 * @apiParam (Body) {String} password User password
 * 
 * @apiSuccess {Token} data Returns a Token object
 * @apiSuccessExample {Token} Success-Response:
 * HTTP/1.1 201 Created
 * 
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwZWNlNWRiLWNkMTQtNGYyMS04MTJmLTk2NjYzM2U3YmU4NiIsIm5hbWUiOiJCcml0bmV5IiwiZW1haWwiOiJicml0bmV5YmxhbmtlbnNoaXBAcXVvdGV6YXJ0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU5ODYzMDAzNywiZXhwIjoxNTk4NjMzNjM3fQ.gB6FF5YprU0tXfl660aiEBkg1WmxJuD_JPaNijbQpHY"
 * }
 * 
 */
const postTokenController = async (req, res, next) => {
    let [users, err] = await to(getUsers({}))
    if (err) return next(err)
    
    let user = users.find(x => x.email === req.body.email && x.id === req.body.password)
    if (user)
        return jwt.sign(user, process.env.API_SECRET, { algorithm: 'HS256', expiresIn: '1h' },
            function (err, token) {
                if (err) return next(err)
                return created({ token }, req, res)
            }
        )
    return notFound(req, res)
}

export { postTokenController }