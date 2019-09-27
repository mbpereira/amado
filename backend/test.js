require('dotenv/config')

const ActiveRecord = require('./src/models/active-record')


const produto = new ActiveRecord('products').save({
    id: 1,
    code: '15723',
    name: 'violacao',
    idcategory: 457893
}).then(r => console.log(r)).catch(e => console.log(e))