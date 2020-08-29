import { unauthorized, forbidden } from './responses.js'

const authenticate = ({ roles } = {}) => (req, res, next) => {
    if (!req.user) return unauthorized(req, res)
    if (req.user.role == 'admin' || roles && roles.includes(req.user.role)) return next()
    return forbidden(req, res)
}

export { authenticate }