const { Customer, User } = require('../models')
const { Errors } = require('../errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const expiresIn = 1800

class AuthController {

    static register (req, res, next) {

        const body = req.body

        bcrypt.hash(body.pass, 13)
            .then(hash => ({ ...body, pass: hash}))
            .then(data => Customer.query().insertGraph(data).returning('*'))
            .then(user => {

                const { name, email } = user
                const token = jwt.sign({ id: user.id, isAdmin: false }, process.env.SECRET)

                res.status(201).send({ name, email, token, expiresIn })
                
            })
            .catch(next)


    }

    static login (req, res, next) {

        const body = req.body

        Customer.query().where('email', body.email).first()
            .then(async user => {


                if(!user)
                    throw Errors.NotFound('Usuario nao econtrado')

                if(!await bcrypt.compare(body.pass, user.pass))
                    throw Errors.Unauthorized('Senha invalida')

                return user


            })
            .then(user => {

                const { name, email } = user

                const token = jwt.sign({ id: user.id, isAdmin: false }, process.env.SECRET)
                res.status(200).send({ name, email, token, expiresIn })


            })
            .catch(next)
    }

    static adminLogin (req, res, next) {


        User.query().where('username', req.body.username).first()
            .then(async user => {

                console.log(user)

                if(!user)
                    throw Errors.NotFound("Usuario nao econtrado")

                if(!await bcrypt.compare(req.body.pass, user.pass))
                    throw Errors.Unauthorized("Senha invalida")

                return user


            })
            .then(user => {
                
                const token = jwt.sign({ id: user.id, isAdmin: true }, process.env.SECRET)
                res.status(200).send({ token })


            })
            .catch(next)


    }

    static logout (req, res, next) {

    }

    static unsubscribe (req, res, next) {
        
    }
}

module.exports = AuthController