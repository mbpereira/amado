
const privates = [
    'pass'
]

const validOperators = [
    '=',
    '!=',
    '>=',
    '<=',
    'like',
    'in',
    'not in',
    'between',
    'not between'
]

function withoutPrivate (data, force = []) {
    if(!Array.isArray(data)) {

        privates.map(private => {
            if(data.hasOwnProperty(private) && force.indexOf(private) === -1)
                delete data[private]
        })

        return data
    }

    data.map(current => {
        privates.map(private => {
            if(current.hasOwnProperty(private) && force.indexOf(private))
                delete current[private]
        })
    })

    return data
    
}
function contains (str, value) {
    return str.indexOf(value) !== -1
}
function isValidOperator(operator) {
    return validOperators.indexOf(operator) !== -1
}

function mount (field, operatorOrValue, value) {
    if(!value) {

        this.values.push(operatorOrValue)
        const filter = `${field} = $${this.values.length} `

        this.query += filter

        return this
    }

    if(!isValidOperator(operatorOrValue))
        throw "Operador invalido"
    
    this.values.push(value)

    this.query += `${field} ${operatorOrValue} $${this.values.length} `

    return this
}

async function exec (query) {
    const self = this
    return await self.connect
        .then(async client => {
            try {
                console.log(query)
                const data = await client.query(query, self.values)
                console.log("Retornado", data.rows)
                return data.rows
            } finally {
                client.release()
            }
        })   
}

function QueryBuilder (connect, table = '') {
    this.connect = connect
    this.table = table
    this.fields = '*'
    this.query = ''
    this.values = []
    this.limit = 250
    this.offset = 0
}
QueryBuilder.prototype.select = function (fields = '*') {
    this.fields = fields
    return this
}
QueryBuilder.prototype.from = function (table) {
    this.table = table
    return this
}
QueryBuilder.prototype.where = function (field, operatorOrValue, value) {
    // verifica se o builder já foi inicializado
    if(contains(this.query, 'WHERE')) {
        this.query += 'AND '
    } else {
        this.query += 'WHERE  '
    }
    // verifica se os três argumetos foram passados
    return mount.apply(this, [field, operatorOrValue, value])
}

QueryBuilder.prototype.andWhere = function (field, operatorOrValue, value) {
    // query ja foi iniciada
    if(contains(this.query, 'WHERE')) {
        this.query += 'AND '
    } else {
        this.query += 'WHERE '
    }

    return mount.apply(this, [field, operatorOrValue, value])

}
QueryBuilder.prototype.orWhere = function (field, operatorOrValue, value) {
    if(contains(this.query, 'WHERE')) {
        this.query += 'OR '
    } else {
        this.query += 'WHERE '
    }

    return mount.apply(this, [field, operatorOrValue, value])
}
QueryBuilder.prototype.find = async function (id) {
    if(!!this.primaryKey)
        this.where(this.primaryKey, id)
    else
        this.where('id', id)
    
    const data = await this.get()

    return data[0]
}
QueryBuilder.prototype.get = async function (options) {
    if(!this.table)
        throw "Tabela nao definida"

    let query = `SELECT `

    if(Array.isArray(this.fields)) {
        query += `(${this.fields.join(', ')}) `
    } else {
        query += this.fields + ' '
    }

    query += `FROM ${this.table} `
    if(!!this.query)
        query += `${this.query} `

    if(!isNaN(Number(this.offset)))
        query += `OFFSET ${this.offset}`

    const data = await exec.apply(this, [query])

    if(!options)
        return withoutPrivate(data)

    return withoutPrivate(data, options.force || [])

}
QueryBuilder.prototype.skip = function (n) {

    const skip = Number(n)

    if(isNaN(skip)) 
        throw "SKIP deve receber um número"

    this.offset = skip
    return this
}
QueryBuilder.prototype.insert = function (data) {

    this.fields = Object.keys(data)
    this.values = Object.values(data)

    if(!this.table)
        return this

    const stmt = this.fields.map((field, index) => `$${Number(index + 1)}`)

    this.query = `INSERT INTO ${this.table} (${this.fields.join(', ')}) VALUES (${stmt.join(', ')}) `
    return this
}
QueryBuilder.prototype.into = function (table) {

    if(!Array.isArray(this.fields))
        throw "Campos invalidos"
    
    if(!Array.isArray(this.values))
        throw "Valores invalidos"

    //Cria um array no formato ['$1', '$2', ..., '$n']
    const stmt = this.fields.map((field, index) => `$${Number(index + 1)}`)

    this.query = `INSERT INTO ${table} (${this.fields.join(', ')}) VALUES (${stmt.join(', ')}) `

    return this
}


QueryBuilder.prototype.update = function (data, table) {
    const fields = Object.keys(data)
    const values = Object.values(data)
    this.values.push(...values)

    const stmt = fields.map((field, index) => {
        return `${field} = $${Number(index + 1)}`
    })

    if(!table && !this.table)
        throw "Tabela nao definida"
    
    const tbl = (!table) ? this.table : table

    this.query = `UPDATE ${tbl} SET ${stmt.join(', ')} `

    return this
}

QueryBuilder.prototype.send = async function () {
    if(!contains(this.query, 'INSERT') && !contains(this.query, 'UPDATE'))
        throw "Query mal construida"

    const data = await exec.apply(this, [this.query + 'RETURNING *'])

    return withoutPrivate(data)
}

const test = async (instance) => {
    const QB = new QueryBuilder(instance)

    try {
        const inserted = await QB.from("Products").find(2)
        console.log(inserted)
    } catch (e) {
        console.log(e)
    }
}

module.exports = QueryBuilder

