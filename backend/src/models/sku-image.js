const Model = require('./model')
const Sku = require('./sku')

class SkuImage extends Model {
    static get tableName () {
        return 'skuimages'
    }

    static get relationMappings () {
        return {
            sku: {
                relation: Model.BelongsToOneRelation,
                modelClass: Sku,
                join: {
                    from: 'skuimages.idsku',
                    to: 'sku.id'
                }
            }
        }
    }
}
module.exports = SkuImage