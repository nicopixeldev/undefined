import validate from '.'

describe('omdb-errors', () => {

    describe('String', () => {
        it('should succeed on correct string', () => {

            expect( () => validate([{ key: 'string', value: 'whatever string', type: String }])
            ).not.toThrowError()

        })

        it('should throw an error on different type', () => {

            expect( () => validate([{ key: 'string', value: 12, type: String }])
            ).toThrowError(TypeError, `${12} is not a string`)

        })

        it('should throw an error is string is empty', () => {

            expect( () => validate([{ key: 'string', value: '', type: String }])
            ).toThrowError(`string cannot be empty`)
        })

        it('shouldn\'t thrown an error if optional is undefined and value is null', () => {

            expect( () => validate([{ key: 'string', value: null, type: String }])
            ).not.toThrowError(`string cannot be empty`)
        })
    })

    describe('Number', () => {
        it('should succeed on correct Number', () => {

            expect( () => validate([{ key: 'number', value: 3, type: Number }])
            ).not.toThrowError()

        })

        it('should throw an error on different type', () => {

            expect( () => validate([{ key: 'number', value: 'ascdasdc', type: Number }])
            ).toThrowError(TypeError, `${12} is not a string`)

        })

        it('should throw an error if number is bellow zero', () => {

            expect( () => validate([{ key: 'number', value: -2, type: Number }])
            ).toThrowError(`number cannot be bellow zero`)
        })
    })

    describe('Object', () => {
        it('should succeed on correct Object', () => {

            expect( () => validate([{ key: 'object', value: {}, type: Object }])
            ).not.toThrowError()

        })

        it('should throw an error on different type', () => {

            expect( () => validate([{ key: 'array', value: ['this is an array instead of object'], type: Object }])
            ).toThrowError(TypeError, `array is not an object`)

        })

    })

    //lint require always a default value in every switch
    describe('default value in switch', () => {
        it('should succeed on using a value to go inside default value', () => {

            expect( () => validate([{ key: 'object', value: [], type: Array }])
            ).not.toThrowError()

        })  

    })
})