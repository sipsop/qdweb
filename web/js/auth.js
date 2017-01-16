class Auth {
    constructor(clientId, domain) {
        this.lock = new Auth0Lock(clientId, domain, {
            auth: {
            redirectUrl: 'http://localhost:9000/verify.html',
            responseType: 'token',
        }
        })
        this.authenticated = this.authenticated.bind(this)
        this.login    = this.login.bind(this)
        this.loggedIn = this.loggedIn.bind(this)
        this.setToken = this.setToken.bind(this)
        this.getToken = this.getToken.bind(this)
        this.logout   = this.logout.bind(this)
        this.redirectWhenAuthenticated = this.redirectWhenAuthenticated.bind(this)
    }

    authenticated(authResult) {
        console.log("AUTHENTICATED!!!", authResult)
        this.setToken(authResult.idToken)
        window.location = '/connect.html'
    }

    redirectWhenAuthenticated() {
        this.lock.on('authenticated', this.authenticated)
    }

    login() {
        this.lock.show()
    }

    loggedIn() {
        return !!this.getToken()
    }

    setToken(idToken) {
        // Saves user token to local storage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from local storage
        localStorage.removeItem('id_token');
    }
}

var auth = new Auth(
    'Zg9Rf6RYJQ9ZVvPnXbHiDZZweCnN9mYx',
    'tuppu.eu.auth0.com'
)
