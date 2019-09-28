const Model = require('./model')
const CustomerAddress = require('./customer-address')



class Customer extends Model {

    static get tableName () {
        return 'customers'
    }

    static get relationMappings () {
        return {
            addresses: {
                relation: Model.HasManyRelation,
                modelClass: CustomerAddress,
                join: {
                    from: 'customers.id',
                    to: 'customeraddresses.idcustomer'
                }
            },
            // orders: {},
        }
    }
}

module.exports = Customer