'use strict';

const utils = require('../utils');

class Step {
    constructor(keyword, text) {
        this.keyword = utils.normalize(keyword);
        this.text = text;
    }
    
    static parse(obj) {
        if (!obj || obj.type !== 'Step') {
            throw new TypeError('The given object is not a Step!');
        }
        return new Step(obj.keyword, obj.text);
    }

    toString() {
        return `${this.keyword} ${this.text}`;
    }
}

module.exports = Step;