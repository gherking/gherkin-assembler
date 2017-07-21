'use strict';

const utils = require('../utils');
const DocString = require('./DocString');

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
        this.keyword = utils.normalize(keyword);
        /** @member {string} */
        this.text = text;
        this.argument = null;
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
        const step = new Step(obj.keyword, obj.text);
        if (obj.argument) {
            switch (obj.argument.type) {
                case 'DocString':
                    step.argument = DocString.parse(obj.argument);
                    break;
            }
        }
        return step;
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the Step.
     * @returns {string}
     */
    toString() {
        const lines = utils.lines();
        lines.add(`${this.keyword} ${this.text}`);
        if (this.argument) {
            lines.add(this.argument.toString());
        }
        return lines.toString();
    }
}

module.exports = Step;