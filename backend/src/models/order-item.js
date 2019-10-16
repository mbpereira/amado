const Model = require('./model')

class OrderItem extends Model {
    static get tableName() {
        return 'order_items'
    }
    static get relationMappings() {
        const Order = require('./order')
        const Stock = require('./stock')
        return {
            order: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'order_items.id_order',
                    to: 'orders.id'
                }
            },
            stock: {
                relation: Model.HasOneRelation,
                modelClass: Stock,
                join: {
                    from: 'order_items.id_stock',
                    to: 'stocks.id'
                }
            }
        }
    }
}

module.exports = OrderItem