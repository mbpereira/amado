const path = require('path')
const fs = require('fs')

const { Errors: errors } = require('../errors')
const { SkuImage } = require('../models')

const { cp, rm, mkdir } = require('../helpers')

const imagePath = 'images/sku'
const resolvedImagePath = path.resolve('src', 'static', imagePath)


const save = (skuId, file) => {

    if(!file.name)
        return Promise.reject({ message: "Arquivo sem nome" })

    const skuImageDir = path.join(resolvedImagePath, skuId.toString())

    const from = file.path
    const to = path.join(resolvedImagePath, skuId.toString(), file.name)

    return mkdir(skuImageDir)
        .then(() => cp(from, to))
        .then(() => rm(from))
        .then(() => ({ 
            idsku: skuId, 
            link: `/${imagePath}/${skuId}/${file.name}`, 
            src: `static/${imagePath}/${skuId}/${file.name}`, 
            name: file.name
        }))
        
}

const saveImagesToSkuDir = (skuId, files) => {

    if(Array.isArray(files)) {
        return Promise.all(files.map(file => save(skuId, file)))
    }

    return save(skuId, files)

}

class SkuImageController {

    static store (req, res, next) {

        console.log(req.files)

        if(!req.fields)
            return next(errors.BadRequest("Parametros obrigatórios não econtrados"))

        if(!req.fields.idsku)
            return next(errors.BadRequest("idsku é obrigatório"))

        if(!req.files)
            return next(errors.BadRequest("Nenhum arquivo enviado"))

        if(!req.files.images)
            return next(errors.BadRequest("images é obrigatório"))

        saveImagesToSkuDir(req.fields.idsku, req.files.images)
            .then(savedFiles => SkuImage.query().insert(savedFiles).returning('*'))
            .then(savedFiles => res.status(201).send(savedFiles))
            .catch(next)

    }

    static download (req, res, next) {
        res.download(path.join(resolvedImagePath, req.params.skuId, req.params.imgName))
    }

    static destroy (req, res, next) {

    }
    
}

module.exports = SkuImageController