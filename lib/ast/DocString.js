'use strict';

const utils = require('../utils');

/**
 * Model of a Cucumber DocString step argument
 * @class
 */
class DocString {
    /**
     * @constructor
     * @param {string} content The content of the DocString
     */
    constructor(content) {
        /** @member {string} */
        this.content = content;
    }

    /**
     * Parses a DocString object, based on the passed AST object.
     * @param {Object} obj
     * @returns {DocString}
     * @throws {TypeError} If the passed object is not a DocString.
     */
    static parse(obj) {
        if (!obj || obj.type !== 'DocString') {
            throw new TypeError('The given object is not a DocString!');
        }
        return new DocString(obj.content);
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the DocString.
     * @returns {string}
     */
    toString() {
        const lines = utils.lines();
        lines.add('"""', this.content, '"""');
        return lines.toString();
    }
}

module.exports = DocString;