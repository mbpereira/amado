const Model = require('./model')
const Sku = require('./sku')
class SkuStock extends Model {

    static get tableName () {
        return 'skustock'
    }

    static get relationMappings () {
        return {
            sku: {
                relation: Model.BelongsToOneRelation,
                modelClass: Sku,
                join: {
                    from: 'skustock.idsku',
                    to: 'sku.id'
                }
            }
        }
    }
}

module.exports = SkuStock