const ActiveRecord = require('../models/active-record').ActiveRecord

async function index (req, res, next) {
    
    const product = new ActiveRecord('Products')
    const category = req.query.idCategory

    try {
        let products = null
        if(!!category) {
            products = await product.where('idCategory', category).get()
        } else {
            products = await product.all()
        }

        res.status(200).send(products)

    } catch (e) {
        next(e)
    }
    
}

async function find (req, res, next) {

}

module.exports = {
    index,
    find
}