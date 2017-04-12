'use strict';

const Tag = require('./Tag');
const Step = require('./Step');

class Scenario {
    constructor(keyword, name, description) {
        this.keyword = keyword;
        this.name = name;
        this.description = description;
        this.tags = [];
        this.steps = [];
    }

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
}

module.exports = Scenario;