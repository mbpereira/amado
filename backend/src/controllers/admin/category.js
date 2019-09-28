
const { Category } = require('../../models')

class CategoryController {

    static index (req, res, next) {
        Category.query()
            .then(r => res.status(200).send(r))
    }

    static store (req, res, next) {
        Category.query().insert(req.body)
            .then(r => res.status(201).send(r))
            .catch(next)
    }

    static show (req, res, next) {
        Category.query().findById(req.params.id)
            .then(r => res.status(200).send(r))
            .catch(next)
    }

    static destroy (id) {

    }

    static update (id, data) {
        
    }

}

module.exports = CategoryController