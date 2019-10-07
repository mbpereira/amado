const formidable = require('formidable')
const { Errors, handler: getHttpError } = require('../errors')

const parse = (req, res, next) => {
    
    const form = new formidable.IncomingForm()

    form.multiples = true

    form.parse(req, (err, fields, files) => {

        if(err) {

            console.error(err)

            const httpError = getHttpError(err)

            return res.status(httpError.code).send(httpError.parse())

        }

        req.files = files
        req.fields = fields

        next()

    })

}

module.exports = parse