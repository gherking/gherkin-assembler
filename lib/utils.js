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
    }
};

module.exports = utils;