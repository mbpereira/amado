const pg = require('../database')
const errors = require('../errors/errors')
const errorHandler = require('../errors/error-handler')


function withoutPrivate (privateProps, data, force = []) {
    if(!Array.isArray(privateProps))
        return data

    privateProps.map(prop => {
        if(data.hasOwnProperty(prop) && force.indexOf(prop) === -1)
            delete data[prop]
    })

    return data
    
}
function ActiveRecord (table, rules = null) {

    this.table = table

    if(!!rules)
        this.rules = rules
    else
        this.rules = {privates: []}
}

ActiveRecord.prototype.connect = function () {
    return pg.connect()
}
/**
 * Retona todos os dados de uma entidade
 * @returns Array
 */
ActiveRecord.prototype.all = async function () {
    return await this.connect()
        .then(async client => {
            try {
                const data = await client.query(`SELECT * FROM ${this.table}`)

                return data.rows.map(row => withoutPrivate(this.rules.privates, row))
            } catch (e) {
                errorHandler(e)
            } finally {
                client.release()
            }
        }).catch(e => {
            console.error("Erro ao estabelecer conexao", e)
            errorHandler(e)
        })

}

/**
 * Retorna um registro especifico
 * @returns Object
 * @returns null
 */
ActiveRecord.prototype.find = async function (id) {
    return await pg.connect()
        .then(async client => {
            try {
                const data = await client.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id])

                if(!data.rows && !data.rows.length)
                    throw errors.NotFound(`Registro ${id} não encontrado para ${this.table}`)

                return withoutPrivate(this.rules.privates, data.rows[0])
            } catch (e) {
                console.error(`${this.table} ERRO AO BUSCAR ${id}`, e)
                errorHandler(e)
            } finally {
                client.release()
            }
        }).catch(e => {
            console.error("Erro ao estabelecer conexao", e)
            errorHandler(e)            
        })
}

/**
 * Salva um registro especifico
 * @returns Object
 * @returns null
 */
ActiveRecord.prototype.save = async function (data) {

    const fields = Object.keys(data)
    const values = Object.values(data)

    const stmt = values.map((value, index) => '$' + Number(index + 1))

    const query = `INSERT INTO ${this.table} (${fields.join(',')}) VALUES (${stmt.join(',')}) RETURNING *`
    console.log(query)

    return await pg.connect()
        .then(async client => {
            try {
                const data = await client.query(query, values)
                return withoutPrivate(this.rules.privates, data.rows[0])
            } catch (e) {
                console.error(`${this.table} ERRO AO BUSCAR`, e)
                errorHandler(e)
            } finally {
                client.release()
            }
        }).catch(e => {
            console.log("Erro ao estabelecer conexao", e)
            errorHandler(e)
        })
}

/**
 * 
 * Atualiza e retorna o objeto atualizado
 * 
 * @returns Object
 */
ActiveRecord.prototype.update = async function (id, data) {
    const fields = Object.keys(data)
    const values = Object.values(data)

    
    const stmt = fields.map((field, index) => {
        return `${field} = $${Number(index + 1)}`
    })

    const query = `UPDATE ${this.table} SET ${stmt.join(', ')}, updatedAt = NOW() WHERE id = $${Number(values.length + 1)} RETURNING *`
    console.log(query)
    return await pg.connect()
        .then(async client => {
            try {
                const data = await client.query(query, [...values, id])
                return withoutPrivate(this.rules.privates, data.rows[0])
            } catch (e) {
                console.log(`${this.table} ERRO AO BUSCAR ${id}`, e)
                errorHandler(e)
            } finally {
                client.release()
            }
        }).catch(e => {
            console.error("Erro ao estabelecer conexao", e)
            errorHandler(e)
        })
}


const test = async () => {
    const product = new ActiveRecord('Products')

    try {
        // const saved = await product.save({
        //     id: 548923,
        //     code: '40028923',
        //     name: 'Panelas'
        // })
        
        const oneProduct = await product.find(1)
        const allProducts = await product.all()
        // const update = await product.update(2, {
        //     name: 'Vestidos p/ Crianças'
        // })*/

        // console.log("saved", saved)
        console.log("found", oneProduct)
        console.log("all", allProducts)
        // console.log("updated", update)
    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    test,
    ActiveRecord
}