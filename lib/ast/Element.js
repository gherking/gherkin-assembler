'use strict';

const Tag = require('./Tag');
const Step = require('./Step');
const utils = require('../utils');

/**
 * Model of a Cucumber Feature element
 * @class
 */
class Element {
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
        /** @member {Array<Step>} */
        this.steps = [];
    }
}

module.exports = Element;