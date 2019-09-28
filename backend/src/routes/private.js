const express = require('express') 
const { Middlewares, Customer } = require('../controllers')

const router = express.Router()

// verifica se o token é valido
router.use(Middlewares.Authorization)

router.get('/api/customer/:id', Customer.show)
router.put('/api/customer/:id', Customer.update)
router.delete('/api/customer/:id', Customer.destroy)

module.exports = router