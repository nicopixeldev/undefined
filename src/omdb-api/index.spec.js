import omdbApi from '.'

describe('ombd-api' , () => {
    describe('searchItems', () => {

        it('should succeed on matching query', () => {
            const query = 'titanic'
            return omdbApi.searchItems(query)
                .then(items => {
                    expect(items).toBeDefined()
                    expect(items instanceof Array).toBeTruthy()
                    expect(items.length).toBe(10)
                })
        })

        it('should fail on query dont found', () => {
            const query = 'sdgfdsdsf'
            return omdbApi.searchItems(query)
            .then(() => {
                throw Error('should not have passed by here')
            })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error.message).toBe("Movie not found!")
            })
        })

        it ('should throw an error on empty query', () => {
            const query = ''
            expect(() => omdbApi.searchItems(query)).toThrowError('query cannot be empty')
        })

        it ('should throw an error on empty undefined', () => {
            const query = undefined
            expect(() => omdbApi.searchItems(query)).toThrowError(`${query} is not a string`)
        })

        it ('should throw an error on empty null', () => {
            const query = null
            expect(() => omdbApi.searchItems(query)).toThrowError(`${query} is not a string`)
        })

        it ('should throw an error on empty number', () => {
            const query = 123
            expect(() => omdbApi.searchItems(query)).toThrowError(`${query} is not a string`)
        })

        it ('should throw an error on empty boolean', () => {
            const query = true
            expect(() => omdbApi.searchItems(query)).toThrowError(`${query} is not a string`)
        })

        it ('should throw an error on empty array', () => {
            const query = []
            expect(() => omdbApi.searchItems(query)).toThrowError(`${query} is not a string`)
        })

        it ('should throw an error on empty object', () => {
            const query = {}
            expect(() => omdbApi.searchItems(query)).toThrowError(`${query} is not a string`)
        })

    describe('retrieveItem', () => {
        
        const expectedResult = {
            Title: 'Raise the Titanic',
            Actors: 'Jason Robards, Richard Jordan, David Selby, Anne Archer',
            Runtime: '115 min',
            imdbID: 'tt0081400',
            imdbRating: '4.9'
        }
        const itemId = expectedResult.imdbID

        it('should retrieve a movie or serie item object with valid id', () => {
            return omdbApi.retrieveItem(itemId)
                    .then(({ Title, Actors, Runtime, imdbID, imdbRating }) => {
                        expect(Title).toBe(expectedResult.Title)
                        expect(Actors).toBe(expectedResult.Actors)
                        expect(Runtime).toBe(expectedResult.Runtime)
                        expect(imdbID).toBe(expectedResult.imdbID)
                        expect(imdbRating).toBe(expectedResult.imdbRating)
                    })
        })

        it('should fail using a space as query for itemID', () => {
            const emptyId = ' '
            expect(() => omdbApi.retrieveItem(emptyId)).toThrowError('itemId cannot be empty')
        })

        it('should fail on empty itemID', () => {
            const itemId = ''
            expect(() => omdbApi.retrieveItem(itemId)).toThrowError('itemId cannot be empty')
        })

        it('should fail on wrong itemID parameter', () => {
            const newId = '123qdsad'

            return omdbApi.retrieveItem(newId)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(({message}) =>  expect(message).toBe('Incorrect IMDb ID.'))
        })

        it('should fail on undefined itemID', () => {
            const itemId = undefined
            expect(() => omdbApi.retrieveItem(itemId)).toThrowError(`${itemId} is not a string`)
        })
    })
})

})
