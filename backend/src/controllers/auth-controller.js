const Customer = require('../models/customer').Customer
const jwt = require('jsonwebtoken')

async function register (req, res, next) {
    const customer = new Customer()
    const body = req.body

    try {
        const saved = await customer.signup(body)
        const token = jwt.sign({id: saved.id}, process.env.SECRET, {
            expiresIn: 300
        })
        res.status(201).send({token})
    } catch (e) {
        next(e)
    }

}

async function login (req, res, next) {
    const customer = new Customer()
    const body = req.body
    try {
        const user = await customer.login(body.email, body.pass)

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