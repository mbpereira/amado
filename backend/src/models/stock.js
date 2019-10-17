const Model = require('./model')
const { raw } = require('objection')

class Stock extends Model {

    static get modifiers() {
        return {
            distinctOptions(builder) {
                builder.select(raw('distinct on (option) option'), '*')
                    .where('on_stock', '!=', 0)
                    .orderBy('option')
            }
        }
    }
    static get tableName () {
        return 'stocks'
    }

    static get relationMappings () {

        const Color = require('./color')

        return {
            color: {
                relation: Model.BelongsToOneRelation,
                modelClass: Color,
                join: {
                    from: 'stocks.id_color',
                    to: 'colors.id'
                }
            }
        }
    }
}

module.exports = Stock