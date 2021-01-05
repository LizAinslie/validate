/**
 * @callback stringValidationFunction
 *
 * @param {string} value
 * @returns {boolean}
 */

/**
 * @callback numberValidationFunction
 *
 * @param {number} value
 * @returns {boolean}
 */

/**
 * A base validation structure.
 *
 * @author Liz Ainslie
 *
 * @abstract
 */
class Validator {
    constructor() {}
}

/**
 * A validation structure specifically tailored to strings.
 *
 * @author Liz Ainslie
 *
 * @property {stringValidationFunction} apply A generated function that will run all the applied checks on its parameter.
 */
class StringValidator extends Validator {
    /**
     * Create a new string validator.
     *
     * @author Liz Ainslie
     *
     * @param {Object} params The validation checks.
     * @param {RegExp} [params.regex] A regular expression to test the value against.
     * @param {string[]} [params.enum] A set of predefined values for the string.
     * @param {stringValidationFunction} [params.func] A custom function to validate the string.
     * @param {number} [params.minLength] A minimum length for the string.
     * @param {number} [params.maxLength] A maximum length for the string.
     */
    constructor(params) {
        super();

        this.apply = value => {
            let valid = true;

            if (!(value instanceof String) || typeof value !== 'string') valid = false;
            if (params.hasOwnProperty('regex') && !params.regex.test(value)) valid = false;
            if (params.hasOwnProperty('enum') && !params.enum.includes(value)) valid = false;
            if (params.hasOwnProperty('func') && !params.func(value)) valid = false;
            if (params.hasOwnProperty('minLength') && value.length < params.minLength) valid = false;
            if (params.hasOwnProperty('maxLength') && value.length > params.maxLength) valid = false;

            return valid;
        }
    }
}

/**
 * A validation structure specifically tailored to numerical values.
 *
 * @author Liz Ainslie
 *
 * @property {numberValidationFunction} apply A generated function that will run all the applied checks on its parameter.
 */
class NumberValidator extends Validator {
    /**
     *
     * @param {object} params The validation checks.
     * @param {number[]} [params.enum] A set of predefined values for the number.
     * @param {numberValidationFunction} [params.func] A custom function to validate the number.
     * @param {number} [params.minValue] The minimum value of the number.
     * @param {number} [params.maxValue] The maximum value of the number.
     */
    constructor(params) {
        super();

        this.apply = value => {
            let valid = true;

            if (params.hasOwnProperty('enum') && !params.enum.includes(value)) valid = false;
            if (params.hasOwnProperty('func') && !params.func(value)) valid = false;
            if (params.hasOwnProperty('minValue') && value < params.minValue) valid = false;
            if (params.hasOwnProperty('maxValue') && value > params.maxValue) valid = false;

            return valid;
        }
    }
}

module.exports = {
    NumberValidator,
    StringValidator,
};
