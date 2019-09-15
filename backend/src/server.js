const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./errors/error-handler')


// ================================
// ROUTES
// ================================
const auth = require('./routes/auth')
const private = require('./routes/private')
const public = require('./routes/public')


const app = express()


// ================================
// MIDDLEWARES
// ================================
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


app.use(auth)
app.use(public)
app.use(private)



//errorHandler
app.use((err, req, res, next) => {
    try {
        console.log(err)
        errorHandler(err)
    } catch (e) {
        console.log(e)
        res.status(e.code).send(e)
    }
})


app.listen(3000)
