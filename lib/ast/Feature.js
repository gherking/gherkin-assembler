'use strict';

const Scenario = require('./Scenario');
const ScenarioOutline = require('./ScenarioOutline');
const Background = require('./Background');
const Tag = require('./Tag');
const utils = require('../utils');

/**
 * Model of a Cucumber Feature
 * @class
 */
class Feature {
    /**
     * @constructor
     * @param {string} keyword The keyword of the feature
     * @param {string} name The name of the feature
     * @param {string} description The description of the feature
     * @param {string} language The language of the feature
     */
    constructor(keyword, name, description, language) {
        /** @member {string} */
        this.keyword = utils.normalize(keyword);
        /** @member {string} */
        this.name = utils.normalize(name);
        /** @member {string} */
        this.description = utils.normalize(description);
        /** @member {string} */
        this.language = language || 'en';
        /** @member {Array<Tag>} */
        this.tags = [];
        /** @member {Array<Scenario|ScenarioOutline|Background>} */
        this.scenarios = [];
    }

    /**
     * Parses a Feature object, based on the passed AST object.
     * @param {Object} obj
     * @returns {Feature}
     * @throws {TypeError} If the passed object is not a Feature.
     */
    static parse(obj) {
        if (!obj || obj.type !== 'Feature') {
            throw new TypeError('The given object is not a Feature!');
        }
        const feature = new Feature(obj.keyword, obj.name, obj.description, obj.language);
        if (Array.isArray(obj.tags)) {
            feature.tags = obj.tags.map(tag => Tag.parse(tag));
        }
        if (Array.isArray(obj.children)) {
            feature.scenarios = obj.children.map(child => {
                switch (child.type) {
                    case 'Scenario':
                        return Scenario.parse(child);
                    case 'ScenarioOutline':
                        return ScenarioOutline.parse(child);
                    case 'Background':
                        return Background.parse(child);
                    default:
                        throw new TypeError(`Not supported type: ${child.type}!`);
                }
            });
        }
        return feature;
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the Feature.
     * @returns {string}
     */
    toString() {
        const lines = utils.lines();
        if (this.tags.length > 0) {
            lines.add(Tag.arrayToString(this.tags));
        }
        lines.add(`${this.keyword}: ${this.name}`);
        if (this.description) {
            lines.add(utils.indent(this.description));
        }
        if (this.scenarios.length > 0) {
            this.scenarios.forEach(item => {
                lines.add(null, utils.indent(item.toString()));
            });
        }
        return lines.toString();
    }
}

module.exports = Feature;