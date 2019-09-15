const jwt = require('jsonwebtoken')
const errors = require('../../errors/errors')
function verify (req, res, next) {
    const token = req.headers['x-access-token']

    try {   
        if(!token) 
            throw errors.Unauthorized("Token nao fornecido")
        
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) throw errors.Unauthorized("Token inválido")
            req.userId = decoded.id
            next()
        })
    } catch (e) {
        console.log(e)
        res.status(e.code || 500).send(e)
    }
}

module.exports = verify