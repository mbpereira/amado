const express = require('express') 
const { Middlewares, Customer, Product, Category, Auth } = require('../controllers')

const router = express.Router()


// PUBLIC ROUTES
router.post('/register', Auth.register)
router.post('/login', Auth.login)

router.get('/api/products', Product.index)
router.get('/api/products/:id', Product.show)

router.get('/api/categories', Category.index)
router.get('/api/categories/:id', Category.show)


// CUSTOMER ROUTES
router.post('/logout', Middlewares.Authorization, Auth.logout)
router.delete('/unsubscribe', Middlewares.Authorization, Auth.unsubscribe)

router.get('/api/me', Middlewares.Authorization, Customer.showMe)
router.patch('/api/me', Middlewares.Authorization, Customer.updateMe)




// ADMIN ROUTES
const adminSteps = [
    Middlewares.Authorization,
    Middlewares.IsAdmin
]
router.post('/admin/login', Auth.adminLogin)
router.post('/api/categories', adminSteps, Category.store)
router.patch('/api/categories/:id', adminSteps, Category.update)


module.exports = router