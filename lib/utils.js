'use strict';

const utils = {
    indent(text, indentation) {
        indentation = indentation || '  ';
        return text
            .split('\n')
            .map(line => indentation + line)
            .join('\n');
    },

    normalize(text) {
        return text
            .split('\n')
            .map(line => line.trim().replace(/\s+/g, ' '))
            .join('\n');
    },

    lines() {
        return new Lines();
    }
};

class Lines extends Array {
    new(text) {
        if (!text) {
            this.push('');
        } else {
            this.push.apply(this, text.split('\n'));
        }
    }

    toString() {
        return this.join('\n');
    }
}

module.exports = utils;