const express = require('express') 
const authorization = require('../controllers/middlewares/authorization')
const CustomerController = require('../controllers/customer/profile')

const router = express.Router()

// verifica se o token é valido
router.use(authorization)


router.route('/api/customer/:id')
    .get(CustomerController.find)
    .put(CustomerController.update)
    .delete(CustomerController.destroy)



module.exports = router