const ActiveRecord = require('./active-record').ActiveRecord
const errors = require('../errors/errors')
const errorHandler = require('../errors/error-handler')
const bcrypt = require('bcrypt')


function Customer () {}
Customer.prototype = new ActiveRecord('Customers', {
    privates: ['pass']
})

Customer.prototype.login = async function (email, pass) {
    const query = `SELECT * FROM ${this.table} WHERE email = $1`

    console.log(query)

    return await this.connect()
        .then(async client => {
            try {
                const data = await client.query(query, [email])

                const user = data.rows[0]

                if(!user)
                    throw errors.NotFound("Usuario nao encontrado")

                if(!await bcrypt.compare(pass, user.pass))
                    throw errors.Unauthorized("Senha invalida")

                user.pass = undefined
                return user 
            } catch (e) {
                console.error("Ocorreu um erro no processo de login", e)
                errorHandler(e)
            }
        }).catch(e => {
            console.error("Ocorreu um erro ao tentar estabelecer a conexao", e)
            errorHandler(e)
        })
}

Customer.prototype.signup = async function (data) {
    try{
        if(!data.pass)
            throw errors.BadRequest('o campo senha precisa ser preenchido')
        if(!data.email)
            throw errors.BadRequest('O campo email precisa ser preenchido')

        data.pass = await bcrypt.hash(data.pass, 13)
        return await this.save(data)
    } catch (e) {
        errorHandler(e)
    }

}

const test = async () => {
    const instances = []
    const promises = []

    for(let index = 0; index < 100; index++) {
        instances.push(new Customer())
    }

    Promise.all(instances.map(instance => instance.all()))
        .then(res => console.log(res))



    // try {

    //     /*const saved = await customer.signup({
    //         cpf: '05915193137',
    //         email: 'mbpereira98@gmail.com',
    //         name: 'Mateus Brandao Pereira',
    //         phone: '65992036262',
    //         pass: '40028922'
    //     })*/

    //     const found = await customer.login('mbpereira98@gmail.com', '40028922')
        
    //     console.log("Found", found)
    //     //console.log("Saved", saved)
    // } catch (e) {
    //     console.error(e)
    // }
}

module.exports = {
    Customer,
    test
}