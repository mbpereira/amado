const path = require('path')
const { Category } = require('../models')
const { Errors } = require('../errors')
const _ = require('lodash')

const { mkdir, cp, rm } = require('../helpers')

const categoryPath = 'images/categories'
const solvedCategoryPath = path.resolve('src', 'static', categoryPath)

const saveThumbnail = (thumbnail) => {
    
    const file = Array.isArray(thumbnail) ? thumbnail[0] : thumbnail

    const from = file.path
    const to = path.join(solvedCategoryPath, file.name)

    return mkdir(solvedCategoryPath)
        .then(() => cp(from, to))
        .then(() => rm(from))
        .then(() => ({
            thumbnail: `/images/categories/${file.name}`
        }))

}

class CategoryController {

    static index (req, res, next) {
        // em caso de sucesso, devolver os dados retornados
        // em caso de falha, mandar o erro para o middleware que faz o tratamento
        Category.query()
            .then(categories => res.status(200).send(categories))
            .catch(next)
        
    }

    static show (req, res, next) {
        Category.query().findById(req.params.id)
            .then(category => {

                if(_.isEmpty(category))
                    throw Errors.NotFound("Categoria nao econtrada")

                res.status(200).send(category)

            })
            .catch(next)
    }

    static store (req, res, next) {

        if(!req.files || !req.files.thumbnail)
            return next(Errors.BadRequest("É obrigatório enviar uma imagem"))

        if(!req.fields)
            return next(Errors.BadRequest("Você precisa enviar os parâmetros"))

        const { name, description } = req.fields

        saveThumbnail(req.files.thumbnail)
            .then(thumbnail => Category.query().insert({ name, description, ...thumbnail }).returning('*'))
            .then(createdCategory => res.status(201).send(createdCategory))
            .catch(next)

    }

    static destroy (req, res, next) {

    }

    static update (req, res, next) {
        Category.query().findById(req.params.id)
            .patch(req.body)
            .returning('*')
            .then(result => {
                if (_.isEmpty(result))
                    throw Errors.NotFound("Registro não econtrado")

                return result
            })
            .then(categories => res.status(200).send(categories))
            .catch(next)
    }


}
module.exports = CategoryController