import { ok, notFound } from '../../responses.js'
import { getPolicyById } from '../../services/policies/getPolicyById.js'

/**
 * 
 * @api {get} /policies/:id 
 * @apiGroup Policies 
 * @apiName Get Policies by Id
 * 
 * @apiParam (Parameters) {Uuid} id
 * 
 * @apiSuccess {Policy} data Returns a Policy object
 * @apiSuccessExample {Policy} Success-Response:
 * HTTP/1.1 200 OK
 * 
 * {
 *   "id": "56b415d6-53ee-4481-994f-4bffa47b5239",
 *   "amountInsured": 2301.98,
 *   "email": "inesblankenship@quotezart.com",
 *   "inceptionDate": "2014-12-01T05:53:13Z",
 *   "installmentPayment": false,
 *   "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
 * }
 * 
 * @apiError NotFound Policy id could not be found
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 */
const getPolicyByIdController = (req, res, next) => {
        getPolicyById(req.params.id)
        .then(
            result => {
                if (result) return ok(result, req, res)
                return notFound(req, res)
            }
        )
        .catch(err => next(err))
}

export { getPolicyByIdController }