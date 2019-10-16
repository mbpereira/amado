const express = require('express')
const bodyParser = require('body-parser')
const { handler: getHttpError } = require('./errors')
const path = require('path')

// ================================
// ROUTES
// ================================
const routes = require('./routes')

const app = express()


// ================================
// MIDDLEWARES
// ================================

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
    next()
});

app.use('/images', express.static(path.join(__dirname, 'static', 'images')))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())



app.use('/', routes)



//errorHandler
app.use((err, req, res, next) => {
    
    const httpError = getHttpError(err)
    
    console.error(err)
    console.error(httpError)

    res.status(httpError.code).send(httpError.parse())
    
})


app.listen(5000)
