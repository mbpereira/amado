const { Category } = require('../models')
const { Errors } = require('../errors')
const _ = require('lodash')

class CategoryController {


    static index (req, res, next) {
        // em caso de sucesso, devolver os dados retornados
        // em caso de falha, mandar o erro para o middleware que faz o tratamento
        Category.query()
            .then(categories => res.status(200).send(categories))
            .catch(next)
        
    }

    static show (req, res, next) {
        Category.query().findById(req.params.id)
            .then(category => {

                if(_.isEmpty(category))
                    throw Errors.NotFound("Categoria nao econtrada")

                res.status(200).send(category)

            })
            .catch(next)
    }

    static store (req, res, next) {
        Category.query().insert(req.body)
            .returning('*')
            .then(r => res.status(201).send(r))
            .catch(next)
    }

    static destroy (req, res, next) {

    }

    static update (req, res, next) {
        Category.query().findById(req.params.id)
            .patch(req.body)
            .returning('*')
            .then(result => {
                if (_.isEmpty(result))
                    throw Errors.NotFound("Registro não econtrado")

                return result
            })
            .then(categories => res.status(200).send(categories))
            .catch(next)
    }


}
module.exports = CategoryController