'use strict';

const utils = require('../utils');
const Scenario = require('./Scenario');
const Examples = require('./Examples');
const Tag = require('./Tag');
const Step = require('./Step');

/**
 * Model of a Cucumber Scenario
 * @class
 */
class ScenarioOutline extends Scenario {
    /**
     * @constructor
     * @param {string} keyword The keyword of the scenario
     * @param {string} name The name of the scenario
     * @param {string} description The description of the scenario
     */
    constructor(keyword, name, description) {
        super(keyword, name, description);

        /** @member {Array<Examples>} */
        this.examples = [];
    }

    /**
     * Parses a Scenario object, based on the passed AST object.
     * @param {Object} obj
     * @returns {Scenario}
     * @throws {TypeError} If the passed object is not a Scenario.
     */
    static parse(obj) {
        if (!obj || obj.type !== 'ScenarioOutline') {
            throw new TypeError('The given object is not a ScenarioOutline!');
        }
        const scenarioOutline = new ScenarioOutline(obj.keyword, obj.name, obj.description);
        if (Array.isArray(obj.tags)) {
            scenarioOutline.tags = obj.tags.map(tag => Tag.parse(tag));
        }
        if (Array.isArray(obj.steps)) {
            scenarioOutline.steps = obj.steps.map(step => Step.parse(step));
        }
        if (Array.isArray(obj.examples)) {
            scenarioOutline.examples = obj.examples.map(examples => Examples.parse(examples));
        }
        return scenarioOutline;
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the Scenario.
     * @returns {string}
     */
    toString() {
        const lines = utils.lines();
        lines.add(super.toString());
        if (this.examples.length > 0) {
            this.examples.forEach(examples => {
                lines.add(null, utils.indent(examples.toString()));
            });
        }
        return lines.toString();
    }
}

module.exports = ScenarioOutline;