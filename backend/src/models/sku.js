const Model = require('./model')
const Product = require('./product')

class Sku extends Model {

    static get tableName () {
        return 'sku'
    }
    
    static get relationMappings () {
        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'sku.idproduct',
                    to: 'products.id'
                }
            }
        }
    }
}

module.exports = Sku