'use strict';

const Scenario = require('./Scenario');
const ScenarioOutline = require('./ScenarioOutline');
const Background = require('./Background');

class Feature {
    constructor(keyword, name, description, language) {
        this.keyword = keyword;
        this.name = name;
        this.description = description;
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
}

module.exports = Feature;