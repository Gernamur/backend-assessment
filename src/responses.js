const ok = (result, req, res) => res.status(200).json(result)
const created = (result, req, res) => res.status(201).json(result)
const unauthorized = (req, res) => res.status(401).json()
const forbidden = (req, res) => res.status(403).json()
const notFound = (req, res) => res.status(404).json()
const conflict = (req, res) => res.status(409).json()
const serverError = (err, req, res) => res.status(500).json(process.env.NODE_ENV == 'development' ? {
    message: err.message,
    stack: err.stack
} : {
    message: '500 Internal Server Error'
})


export {
    ok,
    created,
    unauthorized,
    forbidden,
    notFound,
    conflict,
    serverError
}