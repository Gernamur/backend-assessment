import { ok } from '../../responses.js'
import { to } from '../../await-to.js'
import { getUsers } from '../../services/users/getUsers.js'


/**
 * 
 * @api {get} /users 
 * @apiGroup Users
 * @apiName Get Users
 * 
 * @apiParam (Query) {String} name Filters by users containing the given name value
 * @apiParam (Query) {Uuid} policyId Filters by the user owning the given policyId
 * 
 * @apiSuccess {User} data Returns a list of Users
 * @apiSuccessExample {User[]} Success-Response:
 * HTTP/1.1 OK
 * 
 * [
 *   {
 *     "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
 *     "name": "Britney",
 *     "email": "britneyblankenship@quotezart.com",
 *     "role": "admin"
 *   },
 *   {
 *     "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
 *     "name": "Manning",
 *     "email": "manningblankenship@quotezart.com",
 *     "role": "admin"
 *   },
 *      // ...
 * ]
 * 
 */
const getUsersController = async (req, res, next) => {
    let params = {
        name: req.query.name,
        policyId: req.query.policyId
    }

    let [result, err] = await to(getUsers(params))
    if (err) return next(err)
    return ok(result, req, res)
}

export { getUsersController }