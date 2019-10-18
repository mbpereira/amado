const bcrypt = require('bcrypt')
const { Customer } = require('../models')
const { Errors: errors } = require('../errors')

class CustomerController {

    static showMe (req, res, next) {

        // id recebido através de tradução do token
        const id = Number(req.userId)

        Customer.query().findById(id)
            .then(user => {
                const {pass, ...rest} = user
                res.status(200).send(rest)
            })
            .catch(next)
                
    }

    static updateMe (req, res, next) {


        // id recebido através de tradução do token
        const id = Number(req.userId)

        Customer.query().findById(id).patch(req.body).returning('*')
            .then(updated => {

                if(!updated)
                    throw errors.GeneralError('Nao atualizado')

                const {pass, ...rest} = updated
                res.status(200).send(rest)
            })
            .catch(next)


    }

    static updateMePassword(req, res, next) {
        const id_customer = Number(req.userId)
        const { old_pass, new_pass } = req.body

        Customer.query().findById(id_customer)
            .then(async customer => {

                if(!await bcrypt.compare(old_pass, customer.pass))
                    throw errors.Unauthorized("Senha invalida")

                return bcrypt.hash(new_pass, 13)
                    .then(hash => customer.$query().patch({ pass: hash }).returning('*'))
                    
            })
            .then(updated => {
                const {pass, ...rest} = updated
                res.status(200).send(rest)
            })
            .catch(next)
    }

    static destroy (req, res, next) {
        
    }
}

module.exports = CustomerController