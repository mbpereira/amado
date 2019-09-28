const express = require('express')
const { Product, Category, Auth } = require('../controllers')

const router = express.Router()


router.post('/register', Auth.register)
router.post('/login', Auth.login)

router.get('/api/products', Product.index)
router.get('/api/products/:id', Product.show)

router.get('/api/categories', Category.index)
router.get('/api/categories/:id', Category.show)

// router.get('/api/categories', () => {})

module.exports = router