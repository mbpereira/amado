const { Color } = require('../models')
const { Errors: errors } = require('../errors')


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
    'id', 'id_color', 'id_product',
    'name', 'link',
    'created_at', 'updated_at'
]

class ColorController {

    static index (req, res, next) {

        Color.query().eager('[images, stock]')
            .modifyEager('stock', builder => builder.first())
            .modifyEager('images', builder => builder.select(imageColumnsAllowedToShow))
            // .then(addDownloadLink)
            .then(arrColor => res.status(200).send(arrColor))
            .catch(next)

    }

    static show (req, res, next) {
        Color.query().eager('[images, stock]').findById(req.params.id)
            .modifyEager('stock', builder => builder.first())
            .modifyEager('images', builder => builder.select(imageColumnsAllowedToShow))
            // .then(addDownloadLink)
            .then(sku => res.status(200).send(sku || []))
            .catch(next)
    }

    static store (req, res, next) {
        Color.query().insert(req.body).returning('*')
            .then(sku => res.status(201).send(sku))
            .catch(next)
    }

    static update (req, res, next) {


    }

    static destroy (req, res, next) {}

}



module.exports = ColorController