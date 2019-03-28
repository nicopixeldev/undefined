import omdbApi from '../omdb-api'
import userApi from '../user-api'
import validate from '../omdb-errors'


/**
 * Abstraction of business logic.
 */
const logic = {

    setUserId(id) {
        this.___userId___ = id
    },

    getUserId() {
        return this.___userId___
    },

    setUserApiToken(token) {
        this.___userApiToken___ = token
    },

    getUserApiToken() {
        return this.___userApiToken___
    },

    set __userId__(id) {
        this.setUserId(id)
    },

    get __userId__() {
        return this.getUserId()
    },

    set __userApiToken__(token) {
        this.setUserApiToken(token)
    },

    get __userApiToken__() {
        return this.getUserApiToken()
    },

    /**
    * Registers a user.
    * 
    * @param {string} name - name user.
    * @param {string} surname - surname user.
    * @param {string} email - email user.
    * @param {string} password - password user.
    * @param {string} passwordConfirmation - confirmation to password.
    * @throws {TypeError} - On wrong parameters type.
    * @throws {Error} - On empty parameters value.
    */
    registerUser(name, surname, email, password, passwordConfirmation) {

        validate([
            { key: 'name', value: name, type: String },
            { key: 'surname', value: surname, type: String },
            { key: 'email', value: email, type: String },
            { key: 'password', value: password, type: String },
            { key: 'passwordConfirmation', value: passwordConfirmation, type: String }
        ])

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(name, surname, email, password)
            .then(() => { })
    },

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} email - email user.
     * @param {string} password - password user.
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */

    loginUser(email, password) {

        validate([
            { key: 'email', value: email, type: String },
            { key: 'password', value: password, type: String }
        ])

        return userApi.authenticate(email, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
            })
    },

    /**
     * Store user.
     */

    get userLoggedIn() {
        return !!this.__userId__
    },

    /**
    * Logout user.
    */
    logout() {
        this.__userId__ = null
        this.__userApiToken__ = null
    },


    /**
     * @returns {Promise} - returns the user's parameters.
     */

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(({ id, name, surname, username, favorites }) => ({
                id,
                name,
                surname,
                email: username,
                favorites
            }))
    },

    /**
     * modify the user's parameters
     * 
     * @param {Array} email - email user 
     *   
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    updateUser(favorites) {
        validate([{ key: 'favorites', value: favorites, type: Object }])

        return userApi.update(this.__userId__, this.__userApiToken__, favorites)
    },

    /**
    * 
    * @param {string} -  id the user's name.

    * @retuns {Promise} - shows the user's parameters and then modifies them
    * 
    * @throws {TypeError} - On wrong parameters type.
    * @throws {Error} - On empty parameters value.
    */

    toggleFavorties(id) {
        validate([{ key: 'id', value: id, type: String }])

        return this.retrieveUser().then(user => {
            if (user.favorites.includes(id)) {
                user.favorites = user.favorites.filter(fav => fav !== id)
            } else {
                user.favorites.push(id)
            }
            return this.updateUser(user).then(() => this.retrieveUser().then(user => user))
        })

    },

    /**
     * Retrieve detail from movie or serie.
     * 
     * @param {string} query - The movie query.
     * @param {string} count - The number of results returned.
     * @returns {Promise} - Resolves with movies & series, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     * 
     **/

    searchVideos(query, count = 1) {
        validate([
            { key: 'query', value: query, type: String },
            { key: 'count', value: count, type: Number }
        ])

        return omdbApi.searchItems(query, count)
    },

    /**
     * Retrieve detail from movie or serie.
     * 
     * @param {string} videoId - The movie query.
     * @returns {Promise} - Resolves with movies & series, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     * 
     **/
    retrieveVideo(videoId) {
        validate([{ key: 'videoId', value: videoId, type: String }])

        return omdbApi.retrieveItem(videoId)
    }

}

export default logic