const express = require('express') 
const { Middlewares } = require('../controllers')
const { Customer } = require('../controllers')

const router = express.Router()

// verifica se o token é valido
router.use(Middlewares.Authorization)

router.route('/api/customer/:id')
    .get(Customer.find)
    .put(Customer.update)
    .delete(Customer.destroy)

module.exports = router