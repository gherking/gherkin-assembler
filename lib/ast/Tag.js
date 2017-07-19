'use strict';

/**
 * Model of a Cucumber Tag (annotation)
 * @class
 */
class Tag {
    /**
     * @constructor
     * @param {string} name Name of the tag, e.g. @current
     */
    constructor(name) {
        /** @member {string} */
        this.name = name;
    }

    /**
     * Parses a Tag object, based on the passed AST object.
     * @static
     * @param {Object} obj
     * @returns {Tag}
     * @throws {TypeError} If the passed object is not a Tag.
     */
    static parse(obj) {
        if (!obj || obj.type !== 'Tag') {
            throw new TypeError('The given object is not a Tag!');
        }
        return new Tag(obj.name);
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the Tag.
     * @returns {string}
     */
    toString() {
        return this.name;
    }
}

module.exports = Tag;