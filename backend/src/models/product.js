const Model = require('./model')
const Category = require('./category')
const Sku = require('./sku')

class Product extends Model {

    static get tableName () {
        return 'products'
    }

    static get relationMappings() {

        return {

            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'products.idcategory',
                    to: 'categories.id'
                }
            },

            sku: {
                relation: Model.HasManyRelation,
                modelClass: Sku,
                join: {
                    from: 'products.id',
                    to: 'sku.idproduct'
                }
            }
            
        }
    }
}

module.exports = Product
