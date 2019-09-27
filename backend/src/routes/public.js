const express = require('express')
const Product = require('../controllers/product')
const Category = require('../controllers/category')
const router = express.Router()

router.get('/api/products', Product.index)
router.get('/api/products/:id', Product.find)

router.get('/api/categories', Category.index)
router.get('/api/categories/:id', Category.find)

// router.get('/api/categories', () => {})

module.exports = router