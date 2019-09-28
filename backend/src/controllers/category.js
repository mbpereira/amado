const { Category } = require('../models')

class CategoryController {
    static index (req, res, next) {
        // em caso de sucesso, devolver os dados retornados
        // em caso de falha, mandar o erro para o middleware que faz o tratamento
        Category.query()
            .then(categories => res.status(200).send(categories))
            .catch(next)
        
    }

    static show (req, res, next) {
        
    }
}
module.exports = CategoryController