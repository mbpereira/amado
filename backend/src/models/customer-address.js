const Model = require('./model')
const Customer = require('./customer')

class CustomerAddress extends Model {

    static get tableName () {
        return 'customeraddresses'
    }

    static get relationMappings () {
        return {
            customer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Customer,
                join: {
                    from: 'customeraddresses.id',
                    to: 'customers.id'
                }
            }
        }
    }
}

module.exports = CustomerAddress