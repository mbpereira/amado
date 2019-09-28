const { Model } = require('objection')

const knex = require('knex')({
    client: 'pg',
    connection: process.env.CONNECTION_STRING
})

Model.knex(knex)

module.exports = Model