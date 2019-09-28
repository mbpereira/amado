const Model = require('./model')

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