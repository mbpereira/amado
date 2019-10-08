const Model = require('./model')

class SkuStock extends Model {

    static get tableName () {
        return 'stocks'
    }

    static get relationMappings () {

        const Sku = require('./color')

        return {
            sku: {
                relation: Model.BelongsToOneRelation,
                modelClass: Sku,
                join: {
                    from: 'stocks.id_color',
                    to: 'colors.id'
                }
            }
        }
    }
}

module.exports = SkuStock