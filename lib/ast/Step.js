'use strict';

/**
 * Model of a Cucumber Step
 * @class
 */
class Step {
    /**
     * @constructor
     * @param {string} keyword Keyword of the step
     * @param {string} text Text of the step
     */
    constructor(keyword, text) {
        /** @member {string} */
        this.keyword = keyword.trim();
        /** @member {string} */
        this.text = text;
    }

    /**
     * Parses a Step object, based on the passed AST object.
     * @param {Object} obj
     * @returns {Step}
     * @throws {TypeError} If the passed object is not a Step.
     */
    static parse(obj) {
        if (!obj || obj.type !== 'Step') {
            throw new TypeError('The given object is not a Step!');
        }
        return new Step(obj.keyword, obj.text);
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the Step.
     * @returns {string}
     */
    toString() {
        return `${this.keyword} ${this.text}`;
    }
}

module.exports = Step;