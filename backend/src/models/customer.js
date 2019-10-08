const Model = require('./model')



class Customer extends Model {

    static get tableName () {
        return 'customers'
    }

    static get relationMappings () {

        const CustomerAddr = require('./customer-addr')

        return {
            addresses: {
                relation: Model.HasManyRelation,
                modelClass: CustomerAddr,
                join: {
                    from: 'customers.id',
                    to: 'customer_addrs.id_customer'
                }
            },
            // orders: {},
        }
    }
}

module.exports = Customer