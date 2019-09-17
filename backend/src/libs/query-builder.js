
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
                console.log(self.values)
                const data = await client.query(query, self.values)
                return data.rows
            } finally {
                client.release()
            }
        })   
}

function QueryBuilder (connect) {
    this.connect = connect
    this.fields = '*'
    this.table = ''
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

QueryBuilder.prototype.get = async function () {
    if(!this.table)
        throw "Tabela nao definida"

    let query = `SELECT `

    if(Array.isArray(this.fields)) {
        query += `(${this.fields.join(', ')}) `
    } else {
        query += this.fields + ' '
    }

    query += `FROM ${this.table} ${this.query} `

    if(!isNaN(Number(this.offset)))
        query += `OFFSET ${this.offset}`

    return await exec.apply(this, [query])
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


QueryBuilder.prototype.update = function (table, data) {
    const fields = Object.keys(data)
    const values = Object.values(data)
    this.values.push(...values)

    const stmt = fields.map((field, index) => {
        return `${field} = $${Number(index + 1)}`
    })

    this.query = `UPDATE ${table} SET ${stmt.join(', ')} `

    return this
}

QueryBuilder.prototype.send = async function () {
    if(!contains(this.query, 'INSERT') && !contains(this.query, 'UPDATE'))
        throw "Query mal construida"

    return exec.apply(this, [this.query + 'RETURNING *'])
}

const test = async (instance) => {
    const QB = new QueryBuilder(instance)

    try {
        const inserted = await QB.from("Products").skip(4).get()
        console.log(inserted)
    } catch (e) {
        console.log(e)
    }
}

module.exports = test
//module.exports = QueryBuilder

