const express = require('express') 
const { 
    Customer, 
    Product, 
    Category, 
    Auth, 
    ProductImage, 
    Color 
} = require('./controllers')

const middlewares = require('./middlewares')

const router = express.Router()



// DOWNLOAD ROUTES
router.get('/download/images/sku/:skuId/:imgName', ProductImage.download)

// PUBLIC ROUTES
router.post('/register', Auth.register)
router.post('/login', Auth.login)

router.get('/api/products', Product.index)
router.get('/api/products/:id', Product.show)

router.get('/api/categories', Category.index)
router.get('/api/categories/:id', Category.show)

router.get('/api/colors', Color.index)
router.get('/api/colors/:id', Color.show)

// CUSTOMER ROUTES
router.post('/logout', middlewares.authorization, Auth.logout)
router.delete('/unsubscribe', middlewares.authorization, Auth.unsubscribe)

router.get('/api/me', middlewares.authorization, Customer.showMe)
router.patch('/api/me', middlewares.authorization, Customer.updateMe)

// ADMIN ROUTES
const adminSteps = [
    middlewares.authorization,
    middlewares.isAdmin
]

router.post('/admin/login', Auth.adminLogin)

router.post('/api/categories', [...adminSteps, middlewares.multiparty], Category.store)
router.patch('/api/categories/:id', adminSteps, Category.update)

router.post('/api/products', adminSteps, Product.store)
router.patch('/api/products', adminSteps, Product.update)

router.post('/api/colors', adminSteps, Color.store)
router.patch('/api/colors/:id', adminSteps, Color.update)
router.delete('/api/colors/:id', adminSteps, Color.destroy)

router.post('/api/product-images', [...adminSteps, middlewares.multiparty], ProductImage.store)
router.patch('/api/product-images/:id', adminSteps, ProductImage.update)
router.delete('/api/product-images/:id', adminSteps, ProductImage.destroy)


module.exports = router