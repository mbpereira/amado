const Model = require('./model')

class SkuImage extends Model {
    static get tableName () {
        return 'skuimages'
    }
}
module.exports = SkuImage