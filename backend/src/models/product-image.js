const Model = require('./model')

class SkuImage extends Model {
    static get tableName () {
        return 'product_images'
    }

    static get relationMappings () {

        const Color = require('./color')

        return {
            sku: {
                relation: Model.BelongsToOneRelation,
                modelClass: Color,
                join: {
                    from: 'product_images.id_color',
                    to: 'colors.id'
                }
            }
        }
    }
}
module.exports = SkuImage