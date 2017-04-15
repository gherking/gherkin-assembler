'use strict';

const Tag = require('./Tag');
const Step = require('./Step');
const utils = require('../utils');

class Background {
    constructor(keyword, name, description) {
        this.keyword = utils.normalize(keyword);
        this.name = name ? utils.normalize(name) : '';
        this.description = description ? utils.normalize(description) : '';
        this.steps = [];
    }

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

    toString() {
        const lines = utils.lines();
        lines.new(`${this.keyword}:`);
        if (this.name) {
            lines[0] += ` ${this.name}`;
        }
        if (this.description) {
            lines.new(utils.indent(this.description));
        }
        if (this.steps.length > 0) {
            lines.new();
            this.steps.forEach(step => {
                lines.new(utils.indent(step.toString()));
            });
        }
        return lines.toString();
    }
}

module.exports = Background;