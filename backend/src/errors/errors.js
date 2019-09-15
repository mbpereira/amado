function HttpError (name, message, code) {
    this.name = name
    this.message = message
    this.code = code
    this.stack = (new Error()).stack
}
function Conflict (message) {
    throw new HttpError('Conflict', message || 'Não é possível inserir um registro já existente', 409)
}
function BadRequest (message) {
    throw new HttpError('BadRequest', message || 'Requisição mal formada', 400)
}
function GeneralError (message) {
    throw new HttpError('GeneralError', message || 'Ocorreu um erro no servidor', 500)
}
function Unauthorized (message) {
    throw new HttpError('Unauthorized', message || 'Usuario sem permissao', 401)
}
function NotFound (message) {
    throw new HttpError('NotFound', message || 'Conteúdo requisitado não encontrado', 404)
}
function MethodNotAllowed (message) {
    throw new HttpError('MethodNotAllowed', message || 'Método não implementado para esta rota', 405)
}

module.exports = {
    MethodNotAllowed,
    NotFound,
    Unauthorized, 
    GeneralError,
    BadRequest,
    Conflict,
    HttpError
}