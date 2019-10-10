const Model = require('./model')
const { raw } = require('objection')

class SkuImage extends Model {

    static get modifiers () {
        return {
            preview(builder) {
                const imageRank = `
                    DENSE_RANK () OVER (
                        PARTITION BY id_product ORDER BY id ASC
                    ) image_rank
                `
                builder.with('temp_images', qb => {
                    qb.select(raw(imageRank), '*').from('product_images')
                }).select('*').from('temp_images').where('image_rank', '<=', 2)
            }
        }
    }
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