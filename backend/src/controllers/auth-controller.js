const ActiveRecord = require('../models/active-record')
const errors = require('../errors/errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register (req, res, next) {
    const customer = ActiveRecord('Customers')
    const body = req.body

    try {
        
        body.pass = await bcrypt.hash(body.pass, 13)

        let user = await customer.insert(body).send()
        user = user[0]

        console.log("Usuario retornado", user)
        const token = jwt.sign({id: user.id}, process.env.SECRET, {
            expiresIn: 300
        })
        res.status(201).send({token})
    } catch (e) {
        next(e)
    }

}

async function login (req, res, next) {
    const customer = ActiveRecord('Customers')
    const body = req.body
    try {
        let user = await customer.where('email', body.email).get({
            force: ['pass']
        })

        if(!user)
            throw erros.BadRequest("Usuario nao encontrado")

        if(!user.length)
            throw errors.BadRequest("Usuario não econtrado")
            
        user = user[0]


        if(!await bcrypt.compare(body.pass, user.pass))
            throw errors.Unauthorized("Senha invalida")


        user.pass = undefined

        const token = jwt.sign({id: user.id}, process.env.SECRET, {
            expiresIn: 300
        })
                
        res.status(200).send({token})
    } catch (e) {
        next(e)
    }
}

module.exports = {
    login,
    register
}