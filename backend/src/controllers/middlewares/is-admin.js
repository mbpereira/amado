const { Errors } = require('../../errors')

module.exports = (req, res, next) => {
    if(!req.isAdmin)
        return res.status(401).send(Errors.Unauthorized("Você nao tem permissão para acessar essa página").parse())

    next()
}