class Session {

    static store(data) {
        localStorage.setItem('session', JSON.stringify(data))
    }
    static destroy () {
        localStorage.removeItem('session')
    }
    static isLogged() {
        const session = JSON.parse(localStorage.getItem('session'))

        console.log(session)

        if(!session)
            return false
        
        if(!session.token)
            return false

        console.log(true)
        return true

    }
    static get token() {
        const session = JSON.parse(localStorage.getItem('session'))
        return session ? session.token : null
    }
    static get info() {
        return JSON.parse(localStorage.getItem('session'))
    }

}

export default Session