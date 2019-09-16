
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
    console.log("Mouting")

    if(!value) {

        this.values.push(operatorOrValue)
        const filter = ` ${field} = $${this.values.length}`

        this.filter += filter

        return this
    }

    if(!isValidOperator(operatorOrValue))
        throw "Operador invalido"
    
    this.values.push(value)

    const filter = ` ${field} ${operatorOrValue} $${this.values.length}`
    this.filter += filter
    return this
}
async function exec (query) {
    const self = this
    return await self.connect
        .then(async client => {
            try {
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
    this.filter = ''
    this.values = []
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
    if(contains(this.filter, 'WHERE')) {
        this.filter += ' AND'
    } else {
        this.filter = 'WHERE'
    }
    // verifica se os três argumetos foram passados
    return mount.apply(this, [field, operatorOrValue, value])
}

QueryBuilder.prototype.andWhere = function (field, operatorOrValue, value) {
    // query ja foi iniciada
    if(contains(this.filter, 'WHERE')) {
        this.filter += ' AND'
    } else {
        this.filter = 'WHERE'
    }

    return mount.apply(this, [field, operatorOrValue, value])

}
QueryBuilder.prototype.orWhere = function (field, operatorOrValue, value) {
    if(contains(this.filter, 'WHERE')) {
        this.filter += ' OR'
    } else {
        this.filter = 'WHERE'
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

    query += `FROM ${this.table} ${this.filter}`

    return await exec.apply(this, [query])
}

module.exports = QueryBuilder

