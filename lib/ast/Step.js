'use strict';

const utils = require('../utils');
const DocString = require('./DocString');
const DataTable = require('./DataTable');

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
        /** @member {DocString|DataTable} */
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
                case 'DataTable':
                    step.argument = DataTable.parse(obj.argument);
                    break;
            }
        }
        return step;
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the Step.
     * @param {AssemblerConfig} [options]
     * @returns {string}
     */
    toString(options) {
        const lines = utils.lines(options);
        lines.add(`${this.keyword} ${this.text}`);
        if (this.argument) {
            lines.add(utils.indent(this.argument.toString(options)));
        }
        return lines.toString();
    }
}

module.exports = Step;