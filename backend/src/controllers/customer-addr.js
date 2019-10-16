const { CustomerAddr } = require('../models')

class CustomerAddrController {
    static index(req, res, next) {
        const userId = req.userId
        CustomerAddr.query().where('id_customer', userId)
            .then(addrs => res.status(200).send(addrs))
            .catch(next)
    }
    static show(req, res, next) { }

    static update(req, res, next) {
        const id = req.params.id
        const id_customer = req.userId
        const { street, number, block, zip, complement, city, state } = req.body

        CustomerAddr.query().findOne({ id, id_customer })
            .patch({ 
                street, 
                number, 
                block, 
                zip, 
                complement, 
                city, 
                state
            })
            .returning('*')
            .then(updatedAddr => res.status(201).send(updatedAddr))
            .catch(next)
    }
    static destroy(req, res, next) { }
    static store(req, res, next) {
        const id_customer = req.userId
        const { street, number, block, zip, complement } = req.body
        
        CustomerAddr.query().insert({
            id_customer,
            street,
            number,
            block,
            zip,
            complement
        })
        .returning('*')
        .then(createdAddr => res.status(201).send(createdAddr))
        .catch(next)
    }
}

module.exports = CustomerAddrController