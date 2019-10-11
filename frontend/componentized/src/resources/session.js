
class Session {

    static store(token) {
        localStorage.setItem('session', token)
    }
    static destroy () {
        localStorage.removeItem('session')
    }
    static isLogged() {
        return !!localStorage.getItem('session')
    }
    static get token() {
        return localStorage.getItem('session')
    }

}

module.exports = Session