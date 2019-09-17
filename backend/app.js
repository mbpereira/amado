require('dotenv/config')
const pg = require('./src/database')
//require('./src/server')
const test = require('./src/libs/query-builder')


test(pg.connect())