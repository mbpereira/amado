const Customer = require('../../models/customer').Customer
const errors = require('../../errors/errors')

async function find (req, res, next) {
    const customer = new Customer()
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

    const customer = new Customer()

    try {
        if(!userId)
            throw errors.BadRequest('O parametro id é obrigatório')

        if(userId !== Number(req.userId))
            throw errors.BadRequest('Você não tem permissão para alterar esse usuário')
    
        const updated = await customer.update(userId, data)

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