const express = require('express')
const bodyParser = require('body-parser')
const { Errors, Handler } = require('./errors')
const path = require('path')

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
app.use(express.static(path.join(__dirname, 'static', 'images')))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


app.use(auth)
app.use(public)
app.use(private)



//errorHandler
app.use((err, req, res, next) => {
    const parsed = Handler(err)
    
    console.error(parsed)

    parsed.stack = undefined
    res.status(parsed.code).send(parsed)
})


app.listen(3000)
