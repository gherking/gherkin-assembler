'use strict';

const Tag = require('./Tag');
const Step = require('./Step');
const utils = require('../utils');

class Scenario {
    constructor(keyword, name, description) {
        this.keyword = keyword;
        this.name = name;
        this.description = description ? utils.normalize(description) : '';
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

    toString() {
        const lines = [];
        if (this.tags.length > 0) {
            lines.push(this.tags.join(' '));
        }
        lines.push(`${this.keyword}: ${this.name}`);
        if (this.description) {
            lines.push(utils.indent(this.description));
        }
        if (this.steps.length > 0) {
            lines.push('');
            this.steps.forEach(step => {
                lines.push(utils.indent(step.toString()));
            });
        }
        return lines.join('\n');
    }
}

module.exports = Scenario;