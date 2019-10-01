const { Sku } = require('../models')


const createDownloadLink = (sku) => sku.images.map(image => image.downloadLink = '/download' + image.link)

const addDownloadLink = (skus) => {

    if(!Array.isArray(skus)) {

        createDownloadLink(skus)

        return skus

    }
    
    return skus.map(sku => {

        createDownloadLink(sku)

        return sku

    })
}

const imageColumnsAllowedToShow = [
    'id', 'idsku',
    'name', 'link',
    'createdat', 'updatedat'
]

class SkuController {

    static index (req, res, next) {

        Sku.query().eager('[images, stock]')
            .modifyEager('stock', builder => builder.first())
            .modifyEager('images', builder => builder.select(imageColumnsAllowedToShow))
            .then(addDownloadLink)
            .then(arrSku => res.status(200).send(arrSku))
            .catch(next)

    }

    static show (req, res, next) {
        Sku.query().eager('[images, stock]').findById(req.params.id)
            .modifyEager('stock', builder => builder.first())
            .modifyEager('images', builder => builder.select(imageColumnsAllowedToShow))
            .then(addDownloadLink)
            .then(sku => res.status(200).send(sku))
            .catch(next)
    }

    static store (req, res, next) {
        Sku.query().insert(req.body).returning('*')
            .then(sku => res.status(201).send(sku))
            .catch(next)
    }

    static update (req, res, next) {
        
    }

    static destroy (req, res, next) {}

}



module.exports = SkuController