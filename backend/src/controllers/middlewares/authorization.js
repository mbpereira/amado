const jwt = require('jsonwebtoken')
const { Errors: errors, Handler } = require('../../errors')


const verify = (req, res, next) => {

    const token = req.headers['x-access-token']

    if(!token) 
        throw errors.Unauthorized("Token nao fornecido")
    
    try {   

        jwt.verify(token, process.env.SECRET, (err, decoded) => {

            if(err) throw errors.Unauthorized("Token inválido")

            req.userId = decoded.id
            req.isAdmin = decoded.isAdmin
            
            next()

        })

    } catch (e) {
        const parsed = Handler(e)
        parsed.stack = undefined
        res.status(parsed.code).send(parsed)
    }
}

module.exports = verify