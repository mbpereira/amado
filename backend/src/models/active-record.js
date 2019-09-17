const pg = require('../database')
const QueryBuilder = require('./../libs/query-builder')

function ActiveRecord (table) {
    return new QueryBuilder(pg.connect(), table)
}

module.exports = ActiveRecord