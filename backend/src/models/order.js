const Model = require('./model')

class Order extends Model {
    static get tableName() {
        return 'orders'
    }
    static get relationMappings(){
        const OrderItem = require('./order-item')
        const Customer = require('./customer')
        const CustomerAddr = require('./customer-addr')

        return {
            items: {
                relation: Model.HasManyRelation,
                modelClass: OrderItem,
                join: {
                    from: 'orders.id',
                    to: 'order_items.id_order'
                }
            },
            customer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Customer,
                join: {
                    from: 'orders.id_customer',
                    to: 'customers.id'
                }
            },
            delivery: {
                relation: Model.HasOneRelation,
                modelClass: CustomerAddr,
                join: {
                    from: 'orders.delivery_addr',
                    to: 'customer_addrs.id'
                }
            }
        }
    }
}

module.exports = Order