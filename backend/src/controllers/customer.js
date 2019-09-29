const { Customer } = require('../models')
const { Errors: errors } = require('../errors')

class CustomerController {

    static showMe (req, res, next) {

        // id recebido através de tradução do token
        const id = Number(req.userId)

        if(!id)
            throw errors.BadRequest('O parametro id deve ser informado')

        Customer.query().findById(id)
            .then(user => {
                delete user.pass
                res.status(200).send(user)
            })
            .catch(next)
                
    }

    static updateMe (req, res, next) {


        // id recebido através de tradução do token
        const id = Number(req.userId)

        if(!id)
            throw errors.BadRequest('O parametro id é obrigatório')

        Customer.query().findById(id).patch(req.body).returning('*')
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