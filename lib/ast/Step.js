'use strict';

const utils = require('../utils');
const DocString = require('./DocString');

class Step {
    constructor(keyword, text) {
        this.keyword = utils.normalize(keyword);
        this.text = text;
        this.argument = null;
    }
    
    static parse(obj) {
        if (!obj || obj.type !== 'Step') {
            throw new TypeError('The given object is not a Step!');
        }
        const step = new Step(obj.keyword, obj.text);
        if (obj.argument) {
            switch (obj.argument.type) {
                case 'DocString':
                    step.argument = DocString.parse(obj.argument);
                    break;
            }
        }
        return step;
    }

    toString() {
        const lines = utils.lines();
        lines.new(`${this.keyword} ${this.text}`);
        if (this.argument) {
            lines.new(this.argument.toString());
        }
        return lines.toString();
    }
}

module.exports = Step;