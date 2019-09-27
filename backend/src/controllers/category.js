const ActiveRecord = require('../models/active-record')

const index = (req, res, next) => {
    const category = new ActiveRecord('categories')
    // em caso de sucesso, devolver os dados retornados
    // em caso de falha, mandar o erro para o middleware que faz o tratamento
    category.all()
        .then(categories => res.status(200).send(categories))
        .catch(next)
    
}

const find = (req, res, next) => {
    
}

module.exports = {
    index,
    find
}