const Model = require('./model')

class CustomerAddr extends Model {

    static get tableName () {
        return 'customer_addrs'
    }

    static get relationMappings () {
        
        const Customer = require('./customer')

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

module.exports = CustomerAddr