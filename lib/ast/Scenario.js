'use strict';

const Tag = require('./Tag');
const Step = require('./Step');
const utils = require('../utils');

/**
 * Model of a Cucumber Scenario
 * @class
 */
class Scenario {
    /**
     * @constructor
     * @param {string} keyword The keyword of the scenario
     * @param {string} name The name of the scenario
     * @param {string} description The description of the scenario
     */
    constructor(keyword, name, description) {
        /** @member {string} */
        this.keyword = utils.normalize(keyword);
        /** @member {string} */
        this.name = utils.normalize(name);
        /** @member {string} */
        this.description = utils.normalize(description);
        /** @member {Array<Tag>} */
        this.tags = [];
        /** @member {Array<Step>} */
        this.steps = [];
    }

    /**
     * Parses a Scenario object, based on the passed AST object.
     * @param {Object} obj
     * @returns {Scenario}
     * @throws {TypeError} If the passed object is not a Scenario.
     */
    static parse(obj) {
        if (!obj || obj.type !== 'Scenario') {
            throw new TypeError('The given object is not a Scenario!');
        }
        const scenario = new Scenario(obj.keyword, obj.name, obj.description);
        if (Array.isArray(obj.tags)) {
            scenario.tags = obj.tags.map(tag => Tag.parse(tag));
        }
        if (Array.isArray(obj.steps)) {
            scenario.steps = obj.steps.map(step => Step.parse(step));
        }
        return scenario;
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the Scenario.
     * @returns {string}
     */
    toString() {
        const lines = utils.lines();
        if (this.tags.length > 0) {
            lines.add(this.tags.join(' '));
        }
        lines.add(`${this.keyword}: ${this.name}`);
        if (this.description) {
            lines.add(utils.indent(this.description), null);
        }
        if (this.steps.length > 0) {
            this.steps.forEach(step => {
                lines.add(utils.indent(step.toString()));
            });
        }
        return lines.toString();
    }
}

module.exports = Scenario;