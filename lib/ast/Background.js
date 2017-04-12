'use strict';

const Tag = require('./Tag');
const Step = require('./Step');

class Background {
    constructor(keyword, name, description) {
        this.keyword = keyword;
        this.name = name;
        this.description = description;
        this.tags = [];
        this.steps = [];
    }

    static parse(obj) {
        if (!obj || obj.type !== 'Background') {
            throw new TypeError('The given object is not a Scenario!');
        }
        const background = new Background(obj.keyword, obj.name, obj.description);
        if (Array.isArray(obj.tags)) {
            background.tags = obj.tags.map(tag => Tag.parse(tag));
        }
        if (Array.isArray(obj.steps)) {
            background.steps = obj.steps.map(step => Step.parse(step));
        }
        return background;
    }
}

module.exports = Background;