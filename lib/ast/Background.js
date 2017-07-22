'use strict';

const Tag = require('./Tag');
const Step = require('./Step');
const utils = require('../utils');

/**
 * Model of a Cucumber Background scenario
 * @class
 */
class Background {
    /**
     * @constructor
     * @param {string} keyword The keyword of the background scenario
     * @param {string} name The name of the background scenario
     * @param {string} description The description of the background scenario
     */
    constructor(keyword, name, description) {
        /** @member {string} */
        this.keyword = utils.normalize(keyword);
        /** @member {string} */
        this.name = utils.normalize(name);
        /** @member {string} */
        this.description = utils.normalize(description);
        /** @member {Array<Step>} */
        this.steps = [];
    }

    /**
     * Parses a Background object, based on the passed AST object.
     * @param {Object} obj
     * @returns {Background}
     * @throws {TypeError} If the passed object is not a Background.
     */
    static parse(obj) {
        if (!obj || obj.type !== 'Background') {
            throw new TypeError('The given object is not a Scenario!');
        }
        const background = new Background(obj.keyword, obj.name, obj.description);
        if (Array.isArray(obj.steps)) {
            background.steps = obj.steps.map(step => Step.parse(step));
        }
        return background;
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the Background.
     * @returns {string}
     */
    toString() {
        const lines = utils.lines();
        lines.add(`${this.keyword}: ${this.name}`);
        if (this.description) {
            lines.add(utils.indent(this.description));
        }
        if (this.steps.length > 0) {
            lines.add();
            this.steps.forEach(step => {
                lines.add(utils.indent(step.toString()));
            });
        }
        return lines.toString();
    }
}

module.exports = Background;