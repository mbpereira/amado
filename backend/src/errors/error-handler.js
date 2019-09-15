const errors = require('./errors')

module.exports = function (e) {
    if(e instanceof errors.HttpError)
        throw e
    else
        throw errors.GeneralError(e.message)
}

