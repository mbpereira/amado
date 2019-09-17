const ActiveRecord = require('../../models/active-record')
const errors = require('../../errors/errors')

async function find (req, res, next) {
    const customer = ActiveRecord('Customers')
    const idOfToken = Number(req.userId)
    const userId = Number(req.params.id)

    try {

        if(!userId)
            throw errors.BadRequest('O parametro id deve ser informado')
        if(idOfToken !== userId)
            throw errors.Unauthorized('Você nao tem permissão para ver esse usuário')
        
        
        const user = await customer.find(userId)
        res.status(200).send(user)
    } catch (e) {
        next(e)
    }
            
}
async function update (req, res, next) {
    const userId = Number(req.params.id)
    const {body: data} = req

    const customer = ActiveRecord('Customers')

    try {
        if(!userId)
            throw errors.BadRequest('O parametro id é obrigatório')

        if(userId !== Number(req.userId))
            throw errors.BadRequest('Você não tem permissão para alterar esse usuário')
    
        const updated = await customer.update(data).where('id', userId).send()

        res.status(200).send(updated)
    } catch (e) {
        next (e)
    }

}

async function destroy (req, res, next)  {

}

module.exports = {
    find,
    update,
    destroy
}