const Model = require('./model')

class Color extends Model {

    static get tableName () {
        return 'colors'
    }
    
    static get relationMappings () {

        const Product = require('./product')
        const ProductImage = require('./product-image')
        const Stock = require('./stock')

        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'colors.id_product',
                    to: 'products.id'
                }
            },
            images: {
                relation: Model.HasManyRelation,
                modelClass: ProductImage,
                join: {
                    from: 'colors.id',
                    to: 'product_images.id_color'
                }
            },
            stock: {
                relation: Model.HasManyRelation,
                modelClass: Stock,
                join: {
                    from: 'colors.id',
                    to: 'stocks.id_color'
                }
            }
        }
    }
}

module.exports = Color