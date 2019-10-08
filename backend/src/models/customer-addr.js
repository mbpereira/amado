const Model = require('./model')
const Customer = require('./customer')

class CustomerAddress extends Model {

    static get tableName () {
        return 'customer_addrs'
    }

    static get relationMappings () {
        return {
            customer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Customer,
                join: {
                    from: 'customer_addrs.id',
                    to: 'customers.id'
                }
            }
        }
    }
}

module.exports = CustomerAddress