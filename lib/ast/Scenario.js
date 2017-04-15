'use strict';

const Tag = require('./Tag');
const Step = require('./Step');
const utils = require('../utils');

class Scenario {
    constructor(keyword, name, description) {
        this.keyword = utils.normalize(keyword);
        this.name = name ? utils.normalize(name) : '';
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
        const lines = utils.lines();
        if (this.tags.length > 0) {
            lines.new(this.tags.join(' '));
        }
        lines.new(`${this.keyword}: ${this.name}`);
        if (this.description) {
            lines.new(utils.indent(this.description));
        }
        if (this.steps.length > 0) {
            lines.new('');
            this.steps.forEach(step => {
                lines.new(utils.indent(step.toString()));
            });
        }
        return lines.toString();
    }
}

module.exports = Scenario;