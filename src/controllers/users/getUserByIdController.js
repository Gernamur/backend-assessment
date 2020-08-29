import { ok, notFound } from '../../responses.js'
import { getUserById } from '../../services/users/getUserById.js'

/**
 * 
 * @api {get} /users/:id 
 * @apiGroup Users
 * @apiName Get Users by id
 * 
 * @apiParam (Parameters) {Uuid} id
 * 
 * @apiSuccess {User} data Returns a User object
 * @apiSuccessExample {User} Success-Response:
 * HTTP/1.1 200 OK
 * 
 * {
 *   "id": "2dbaac64-c13b-4d02-a980-e03627dee50d",
 *   "name": "Bethany",
 *   "email": "bethanyblankenship@quotezart.com",
 *   "role": "user"
 * }
 * 
 * @apiError NotFound User id could not be found
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 */
const getUserByIdController = (req, res, next) => {
    getUserById(req.params.id)
        .then(
            result => {
                if (result) return ok(result, req, res)
                return notFound(req, res)
            }
        )
        .catch(err => next(err))
}

export { getUserByIdController }