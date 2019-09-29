const express = require('express')
const bodyParser = require('body-parser')
const { Errors, Handler: getHttpError } = require('./errors')
const path = require('path')

// ================================
// ROUTES
// ================================
const routes = require('./routes')

const app = express()


// ================================
// MIDDLEWARES
// ================================
app.use(express.static(path.join(__dirname, 'static', 'images')))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())



app.use('/', routes)



//errorHandler
app.use((err, req, res, next) => {
    
    console.error(err)

    const httpError = getHttpError(err)
    
    console.error(httpError)

    res.status(httpError.code).send(httpError.parse())
})


app.listen(3000)
