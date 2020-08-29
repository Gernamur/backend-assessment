import { ok } from '../../responses.js'
import { getPolicies } from '../../services/policies/getPolicies.js'

/**
 * 
 * @api {get} /policies 
 * @apiGroup Policies
 * @apiName Get Policies
 * 
 * @apiSuccess {Policy[]} data Return a list of policies
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * 
 * [
 *   {
 *     "id": "64cceef9-3a01-49ae-a23b-3761b604800b",
 *     "amountInsured": 1825.89,
 *     "email": "inesblankenship@quotezart.com",
 *     "inceptionDate": "2016-06-01T03:33:32Z",
 *     "installmentPayment": true,
 *     "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
 *   },
 *   {
 *     "id": "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
 *     "amountInsured": 399.89,
 *     "email": "inesblankenship@quotezart.com",
 *     "inceptionDate": "2015-07-06T06:55:49Z",
 *     "installmentPayment": true,
 *     "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
 *   },
 *      // ...
 * ]
 */
const getPoliciesController = (req, res, next) => {
    getPolicies().then(
        result => ok(result, req, res)
    )
        .catch(err => next(err))
}

export { getPoliciesController }