const _ = require('lodash')
const { Product } = require('../models')
const { Errors: errors } = require('../errors')

class ProductController {
    static index (req, res, next) {

        const category = req.query.idcategory


        // se o parametro categoria for fornecido, busca produtos através deles
        if(!!category)
            return Product.query().where('idcategory', category)
                .then(products => res.status(200).send(products))
                .catch(next)

        Product.query()
            .then(products => res.status(200).send(products))
            .catch(next)
        
    }

    static show (req, res, next) {
        
    }

    static store (req, res, next) {
        Product.query().insertGraph(req.body).returning('*')
            .then(r => res.status(201).send(r))
            .catch(next)
    }

    static update (req, res, next) {
        Product.query().findById(req.params.id)
            .patch(req.body)
            .returning('*')
            .then(result => {

                if(_.isEmpty(result))
                    throw errors.NotFound("Produto nao econtrado")

                res.status(200).send(result)

            })
            .catch(next)
    }
}

module.exports = ProductController