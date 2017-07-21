'use strict';

const split = require('split-lines');
const LINE_BREAK = '\r\n';
const join = arr => arr.join(LINE_BREAK);

/**
 * Object to build a text file, from lines.
 * @class
 */
class Lines {
    /** @constructor */
    constructor() {
        /**
         * @type {Array<string>}
         * @private
         */
        this._lines = [];
    }

    /**
     * Adds a new line with the given text.
     * If the text is not passed,
     * it will be an empty line
     * @param {...string} [texts]
     */
    add(...texts) {
        if (!texts.length) {
            this._lines.push('');
        } else {
            texts.forEach(text => {
                this._lines.push.apply(this._lines, split(text || ''));
            });
        }
    }

    /**
     * Returns the whole text file content.
     * @returns {string}
     */
    toString() {
        return join(this._lines);
    }
}

const INDENTATION = '  ';

const utils = {
    /**
     * Indents the given text with
     * given number of space pairs.
     * @param {string} text Text to indent
     * @param {number} [indentation] Number of indentations, default: 1
     * @returns {string}
     */
    indent(text, indentation = 1) {
        indentation = Math.max(indentation, 0);
        if (!indentation) {
            return text;
        }
        return join(split(text).map(line => INDENTATION.repeat(indentation) + line));
    },

    /**
     * Normalizes the given text,
     * i.e. trims multiple trailing, leading
     * and inner spaces too.
     * @param {string} [text]
     * @returns {string}
     */
    normalize(text) {
        if (!text) {
            return '';
        }
        return join(split(text).map(line => line.trim().replace(/\s+/g, ' ')));
    },

    /**
     * Creates a new Lines object to build text file.
     * @returns {Lines}
     */
    lines() {
        return new Lines();
    }
};

module.exports = utils;