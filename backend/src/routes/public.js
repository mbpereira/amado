const express = require('express')
const Product = require('../controllers/product')
const router = express.Router()

router.get('/api/products', Product.index)
router.get('/api/products/:id', Product.find)

// router.get('/api/categories', () => {})

module.exports = router