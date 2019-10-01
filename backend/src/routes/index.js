const express = require('express') 
const { 
    middlewares, 
    Customer, 
    Product, 
    Category, 
    Auth, 
    SkuImage, 
    Sku 
} = require('../controllers')

const router = express.Router()



// DOWNLOAD ROUTES
router.get('/download/images/sku/:skuId/:imgName', SkuImage.download)

// PUBLIC ROUTES
router.post('/register', Auth.register)
router.post('/login', Auth.login)

router.get('/api/products', Product.index)
router.get('/api/products/:id', Product.show)

router.get('/api/categories', Category.index)
router.get('/api/categories/:id', Category.show)

router.get('/api/sku', Sku.index)
router.get('/api/sku/:id', Sku.show)

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

router.post('/api/categories', adminSteps, Category.store)
router.patch('/api/categories/:id', adminSteps, Category.update)

router.post('/api/products', adminSteps, Product.store)
router.put('/api/products', adminSteps, Product.update)

router.post('/api/sku', adminSteps, Sku.store)
router.patch('/api/sku/:id', adminSteps, Sku.update)
router.delete('/api/sku/:id', adminSteps, Sku.destroy)

router.post('/api/sku-images', [...adminSteps, middlewares.multiparty], SkuImage.store)
router.delete('/api/sku-images/:id', adminSteps, SkuImage.destroy)


module.exports = router