const Model = require('./model')

class Product extends Model {

    static get tableName () {
        return 'products'
    }

    static get relationMappings() {

        const Category = require('./category')
        const Color = require('./color')
        const ProductImage = require('./product-image')
        
        return {

            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'products.id_category',
                    to: 'categories.id'
                }
            },

            colors: {
                relation: Model.HasManyRelation,
                modelClass: Color,
                join: {
                    from: 'products.id',
                    to: 'colors.id_product'
                }
            },

            images: {
                relation: Model.HasManyRelation,
                modelClass: ProductImage,
                join: {
                    from: 'products.id',
                    to: 'product_images.id_product'
                }
            }
            
        }
    }
}

module.exports = Product
