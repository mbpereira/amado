const express = require('express') 
const { Middlewares, Admin, Customer, Product, Category, Auth } = require('../controllers')

const router = express.Router()


// PUBLIC ROUTES
router.post('/register', Auth.register)
router.post('/login', Auth.login)

router.get('/api/products', Product.index)
router.get('/api/products/:id', Product.show)

router.get('/api/categories', Category.index)
router.get('/api/categories/:id', Category.show)


// CUSTOMER ROUTES
router.get('/api/customers/:id', Middlewares.Authorization, Customer.show)
router.put('/api/customers/:id', Middlewares.Authorization, Customer.update)
router.delete('/api/customers/:id', Middlewares.Authorization, Customer.destroy)




// ADMIN ROUTES
const adminSteps = [
    Middlewares.Authorization,
    Middlewares.IsAdmin
]
router.post('/admin/login', Admin.Auth.login)
router.post('/api/categories', adminSteps, Admin.Category.store)
router.put('/api/categories/:id', adminSteps, Admin.Category.update)




// router.get('/api/categories', () => {})

module.exports = router