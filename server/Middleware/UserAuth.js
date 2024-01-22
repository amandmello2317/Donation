const jwt = require('jsonwebtoken')
const JWT_SECERETE = 'hello'

const fetchAdmin = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({ error: "Access denied! No token"})
    }

    try {
        const data = jwt.verify(token, JWT_SECERETE)
        req.adminId = data
        next()
    } catch (error) {
        res.status(405).send({ message: "Invaild token"})
    }
}

module.exports = fetchAdmin