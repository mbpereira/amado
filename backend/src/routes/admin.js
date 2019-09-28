const express = require('express') 
const { Middlewares, Admin } = require('../controllers')

const router = express.Router()

// verifica se o token é valido
router.use(Middlewares.Authorization)
// verifica se o usuário é admin
router.use(Middlewares.IsAdmin)

router.post('/api/category', Admin.Category.show)
router.put('/api/category/:id', Admin.Category.update)
router.delete('/api/customer/:id', Admin.Category.destroy)

module.exports = router