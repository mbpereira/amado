const Model = require('./model')

class Category extends Model {

    static get tableName () {
        return 'categories'
    }

    static get relationMappings () {

        const Product = require('./product')

        return {
            products: {
                relation: Model.HasManyRelation,
                modelClass: Product,
                join: {
                    from: 'categories.id',
                    to: 'products.id_category'
                }
            }
        }
    }

}

module.exports = Category