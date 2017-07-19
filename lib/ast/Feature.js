'use strict';

const Scenario = require('./Scenario');
const ScenarioOutline = require('./ScenarioOutline');
const Background = require('./Background');
const utils = require('../utils');

class Feature {
    constructor(keyword, name, description, language) {
        this.keyword = utils.normalize(keyword);
        this.name = name ? utils.normalize(name) : '';
        this.description = description ? utils.normalize(description) : '';
        this.language = language || 'en';
        this.tags = [];
        this.scenarios = [];
    }

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

    toString() {
        const lines = utils.lines();
        if (this.tags.length > 0) {
            lines.new(this.tags.map(tag => tag.toString()).join(' '));
        }
        lines.new(`${this.keyword}: ${this.name}`);
        if (this.description) {
            lines.new(utils.indent(this.description));
        }
        it (this.scenarios.length > 0) {
            this.scenarios.forEach(item => {
                lines.new();
                lines.new(utils.indent(item.toString()));
            });
        }
        return lines.toString();
    }
}

module.exports = Feature;