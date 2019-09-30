const path = require('path')
const fs = require('fs')
const { Errors: errors } = require('../errors')
const { Sku } = require('../models')

const imagePath = path.resolve('src', 'static', 'images', 'sku')

const addDownloadLink = (arrSku) => arrSku.map(sku => {

    if(sku.images && Array.isArray(sku.images)) {
        sku.images.map(image => {
            image.downloadLink = '/download' + image.link
        })
    }

    return sku

})

const createSkuImageDir = (sku) => {

    const skuImageDir = path.join(imagePath, sku.id.toString())

    return new Promise((resolve, reject) => {

        fs.mkdir(skuImageDir, { recursive: true }, (err) => {

            if(err) return reject(errors.GeneralError(`Ocorreu um erro ao criar o diretório ${skuImageDir}`, err.message))

            resolve(sku)

        })

    })



}

class SkuController {

    static index (req, res, next) {

        const columns = [
            'id', 'idsku',
            'name', 'link',
            'createdat', 'updatedat'
        ]

        Sku.query().eager('images')
            .modifyEager('images', builder => builder.select(columns))
            .then(addDownloadLink)
            .then(arrSku => res.status(200).send(arrSku))
            .catch(next)

    }

    static show (req, res, next) {}

    static store (req, res, next) {

        Sku.query().insert(req.body).returning('*')
            .then(createSkuImageDir)
            .then(sku => res.status(201).send(sku))
            .catch(next)

    }

    static update (req, res, next) {}

    static destroy (req, res, next) {}

}



module.exports = SkuController