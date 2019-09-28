const { Product } = require('../models')

class ProductController {
    static index (req, res, next) {

        const category = req.query.idCategory


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
}

module.exports = ProductController