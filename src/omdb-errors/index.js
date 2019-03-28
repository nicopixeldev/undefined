function validate(params) {
    params.forEach(({ key, value, type, optional }) => {
        switch (type) {

            case String:
                if (typeof value !== 'string') throw TypeError(`${value} is not a string`)
                if (!value.trim().length) throw Error(`${key} cannot be empty`)
            break

            case Number:
                if (typeof value !== 'number') throw TypeError(`${value} is not a number`)
                if (value < 0) throw Error(`${key} cannot be bellow zero`)
            break

            case Object:
                if (!value || value.constructor !== Object) throw TypeError(`${value} is not an object`)
            break

            default:
            break

        }
    })
}

export default validate