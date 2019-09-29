const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Errors } = require('../../errors')
const { User } = require('../../models')

class Auth {
    static login (req, res, next) {
        User.query().where('username', req.body.username).first()
            .then(async user => {
                if(!await bcrypt.compare(req.body.pass, user.pass))
                    throw Errors.Unauthorized("Senha invalida")

                return user
            })
            .then(user => {
                
                const token = jwt.sign({ id: user.id, isAdmin: true }, process.env.SECRET, {
                    expiresIn: 300
                })
                res.status(200).send({ token })
            })
            .catch(next)
    }
}

module.exports = Auth