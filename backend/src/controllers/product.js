const ActiveRecord = require('../models/active-record')

const index = (req, res, next) => {
    
    const product = new ActiveRecord('products')
    const category = req.query.idCategory

    // se o parametro categoria for fornecido, busca produtos através deles
    if(!category)
        return product.get(q => q.where('idcategory', category))
            .then(products => res.status(200).send(products))
            .catch(next)

    product.all()
        .then(products => res.send(200).send(products))
        .catch(next)
    
}

const find = (req, res, next) => {
    
}

module.exports = {
    index,
    find
}