const { cp, rm, mkdir } = require('./helpers')
const path = require('path')

const resolvedImagePath = path.resolve('src', 'static', 'images/products')

const save = (productId, file) => {

    if(!file.name)
        return Promise.reject({ message: "Arquivo sem nome" })

    const productImageDir = path.join(resolvedImagePath, productId.toString())

    const from = file.path
    const to = path.join(resolvedImagePath, productId.toString(), file.name)

    return mkdir(productImageDir)
        .then(() => cp(from, to))
        .then(() => rm(from))
        .then(() => ({ 
            id_product: productId, 
            link: `/images/products/${productId}/${file.name}`, 
            src: `static/images/products/${productId}/${file.name}`, 
            name: file.name
        }))
        
}

const saveImages = (productId, files) => {

    if(Array.isArray(files)) {
        return Promise.all(files.map(file => save(productId, file)))
    }

    return save(productId, files)

}

module.exports = {
    saveImages
}