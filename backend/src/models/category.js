const Model = require('./model')
const Product = require('./product')

class Category extends Model {

    static get tableName () {
        return 'categories'
    }

    static get relationMappings () {
        return {
            products: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: 'categories.id',
                    to: 'products.idcategory'
                }
            }
        }
    }

}

module.exports = Category