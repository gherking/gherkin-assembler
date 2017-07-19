'use strict';

const utils = require('../utils');

class DocString {
    constructor(content) {
        this.content = content;
    }

    static parse(obj) {
        if (!obj || obj.type !== 'DocString') {
            throw new TypeError('The given object is not a DocString!');
        }
        return new DocString(obj.content);
    }

    toString() {
        const lines = utils.lines();
        lines.add('"""', this.content, '"""');
        return lines.toString();
    }
}

module.exports = DocString;