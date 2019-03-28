import validate from '../omdb-errors'


const { REACT_APP_API_OMDB_URL, REACT_APP_API_OMDB_KEY } = process.env

/**
 * OMDB API client.
 * 
 * @version 1.0.0
 */

const omdbApi = {
    url: `${REACT_APP_API_OMDB_URL}?apikey=${REACT_APP_API_OMDB_KEY}`,

     /**
     * Search movie items 
     * 
     * @param {string} query - The text to match on movies & series search.
     * @returns {Promise} - Resolves with array of movies, otherwise rejects with an error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Array} - Array of objects related with every item.
     *                   Empty Array if there is no results.
     */

    searchItems(query, count = 1) {

        validate([
            { key: 'query', value: query, type: String },
            { key: 'count', value: count, type: Number }
        ])

        return fetch(`${this.url}&s=${query}&page=${count}`)
            .then(response => response.json())
            .then(response => {
                if (response.Response === 'False') throw Error(response.Error)
                return response.Search
            })
    },

    /**
     * Retrieve detail from movie or serie.
     * 
     * @param {string} itemId - The movie query
     * @returns {Promise} - Resolves with movies & series, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     * 
     **/

    retrieveItem(itemId) {

        validate([
            { key: 'itemId', value: itemId, type: String }
        ])

        return fetch(`${this.url}&i=${itemId}`)
            .then(item => item.json())
            .then(response => {
                if (response.Response === 'False') throw Error(response.Error)
                return response
            })
    }
}

export default omdbApi