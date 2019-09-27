const jwt = require('jsonwebtoken')
const { Errors: errors } = require('../../errors')


const verify = (req, res, next) => {

    const token = req.headers['x-access-token']

    if(!token) 
        throw errors.Unauthorized("Token nao fornecido")
    
    try {   

        jwt.verify(token, process.env.SECRET, (err, decoded) => {

            if(err) throw errors.Unauthorized("Token inválido")

            req.userId = decoded.id
            next()

        })

    } catch (e) {
        res.status(e.code || 500).send(e)
    }
}

module.exports = verify