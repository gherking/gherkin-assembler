'use strict';

class Step {
    constructor(keyword, text) {
        this.keyword = keyword.trim();
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