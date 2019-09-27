const ActiveRecord = require('../models/active-record')
const { Errors: errors, Handler } = require('../errors')

const find = (req, res, next) => {

    const customer = new ActiveRecord('customers')
    // id recebido através de tradução do token
    const idOfToken = Number(req.userId)
    const userId = Number(req.params.id)

    if(!userId)
        throw errors.BadRequest('O parametro id deve ser informado')
    if(idOfToken !== userId)
        throw errors.Unauthorized('Você nao tem permissão para ver esse usuário')


    customer.find(q => q.where('id', userId))
        .then(user => {
            delete user.pass
            res.status(200).send(user)
        })
        .catch(Handler)
            
}
const update = (req, res, next) => {

    const customer = new ActiveRecord('customers')


    const userId = Number(req.params.id)
    // id recebido através de tradução do token
    const idOfToken = Number(req.userId)
    const { body: data } = req

    if(!userId)
        throw errors.BadRequest('O parametro id é obrigatório')

    if(userId !== idOfToken)
        throw errors.BadRequest('Você não tem permissão para alterar esse usuário')

    customer.update(data, q => q.where('id', userId))
        .then(updated => {

            if(!updated)
                throw errors.GeneralError('Nao atualizado')
            if(!updated.length)
                throw errors.GeneralError('Nao atualizado')


            delete updated[0].pass
            res.status(200).send(updated[0])
        })
        .catch(next)


}

const destroy = (req, res, next) => {

}

module.exports = {
    find,
    update,
    destroy
}