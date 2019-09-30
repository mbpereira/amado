const Model = require('./model')
const Product = require('./product')
const SkuImage = require('./sku-image')

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
            },
            images: {
                relation: Model.HasManyRelation,
                modelClass: SkuImage,
                join: {
                    from: 'sku.id',
                    to: 'skuimages.idsku'
                }
            }
        }
    }
}

module.exports = Sku