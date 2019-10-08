const path = require('path')
const _ = require('lodash')

const { Errors: errors } = require('../errors')
const { ProductImage } = require('../models')
const { product } = require('../helpers')

class ProductImageController {

    static store (req, res, next) {

        if(!req.fields)
            return next(errors.BadRequest("Parametros obrigatórios não econtrados"))

        if(!req.fields.id_product)
            return next(errors.BadRequest("idsku é obrigatório"))

        if(!req.files)
            return next(errors.BadRequest("Nenhum arquivo enviado"))

        if(!req.files.images)
            return next(errors.BadRequest("images é obrigatório"))

        product.saveImages(req.fields.id_product, req.files.images)
            .then(savedFiles => ProductImage.query().insert(savedFiles).returning('*'))
            .then(savedFiles => res.status(201).send(savedFiles))
            .catch(next)

    }
    static update (req, res, next){

        const id = Number(req.params.id)

        const { id_product, id_color } = req.body

        const data = id_product ? { id_product, id_color } : { id_color }

        ProductImage.query().findById(id)
            .patch(data)
            .returning('*')
            .then(updatedImages => {
                if(_.isEmpty(updatedImages))
                    throw errors.NotFound("Registro não encontrado")

                return updatedImages
            })
            .then(updatedImages => res.status(200).send(updatedImages))
            .catch(next)

    }
    static download (req, res, next) {
        res.download(path.join(resolvedImagePath, req.params.productId, req.params.imgName))
    }

    static destroy (req, res, next) {

    }
    
}

module.exports = ProductImageController