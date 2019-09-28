const { Customer } = require('../models')
const { Errors: errors } = require('../errors')

class CustomerController {
    static show (req, res, next) {

        // id recebido através de tradução do token
        const idOfToken = Number(req.userId)
        const userId = Number(req.params.id)

        if(!userId)
            throw errors.BadRequest('O parametro id deve ser informado')
        if(idOfToken !== userId)
            throw errors.Unauthorized('Você nao tem permissão para ver esse usuário')


        Customer.query().findById(userId)
            .then(user => {
                delete user.pass
                res.status(200).send(user)
            })
            .catch(next)
                
    }
    static update (req, res, next) {


        const userId = Number(req.params.id)
        // id recebido através de tradução do token
        const idOfToken = Number(req.userId)
        const { body: data } = req

        if(!userId)
            throw errors.BadRequest('O parametro id é obrigatório')

        if(userId !== idOfToken)
            throw errors.BadRequest('Você não tem permissão para alterar esse usuário')

        Customer.query().findById(userId).patch(data).returning('*')
            .then(updated => {
                console.log(updated)

                if(!updated)
                    throw errors.GeneralError('Nao atualizado')

                delete updated.pass
                res.status(200).send(updated)
            })
            .catch(next)


    }

    static destroy (req, res, next) {
        
    }
}

module.exports = CustomerController