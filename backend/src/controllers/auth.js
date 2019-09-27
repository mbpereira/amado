const ActiveRecord = require('../models/active-record')
const { Errors } = require('../errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {

    const customer = new ActiveRecord('customers')

    const body = req.body

    bcrypt.hash(body.pass, 13)
        .then(hash => ({ ...body, pass: hash}))
        .then(data => customer.save(data))
        .then(inserted => {

            const user = inserted[0]
            const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 300
            })

            res.status(201).send({ token })
            
        })
        .catch(next)
}

const login = (req, res, next) => {

    const customer = new ActiveRecord('customers')

    const body = req.body

    customer.find(q => q.where('email', body.email))
        .then(async user => {
            if(!user)
                throw Errors.NotFound('Usuario nao econtrado')

            if(!await bcrypt.compare(body.pass, user.pass))
                throw Errors.Unauthorized('Senha invalida')

            return user
        })
        .then(user => {

            const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 300
            })
            res.status(200).send({ token })

        })
        .catch(next)
}

module.exports = {
    login,
    register
}