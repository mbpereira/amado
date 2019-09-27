const moment = require('moment-timezone')
const knex = require('knex')({
    client: 'pg',
    connection: process.env.CONNECTION_STRING
})

function ActiveRecord (table) {
    this.table = table
}

ActiveRecord.prototype.all = function (...fields) {
    return knex.select(fields || '*').from(this.table)
}

ActiveRecord.prototype.get = function (filter) {
    const query = filter(knex(this.table))

    return query.select('*').then(r => r)
}

ActiveRecord.prototype.find = function (filter) {
    return this.get(filter).then(r => r[0])
}

ActiveRecord.prototype.save = function (data = []) {
    const self = this
    if(Array.isArray(data))
        return Promise.all(data.map(record => knex.insert(record).into(self.table).returning('*')))

    return knex.insert(data).into(self.table).returning('*')
}

ActiveRecord.prototype.update = function (data, filter) {

    data.updatedat = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')

    const query = filter(knex(this.table))

    return query.update(data).returning('*')

}

module.exports = ActiveRecord