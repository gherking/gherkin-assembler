'use strict';

const split = require('split-lines');
const Table = require('cli-table');
const colors = require('colors/safe');

/**
 * @class
 * @extends Table
 */
class StrippedTable extends Table {
    constructor(config) {
        super(config);
    }

    toString() {
        return colors.strip(super.toString());
    }
}

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
     * @param {...string|*} [texts]
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
        return this._lines.join(utils.LINE_BREAK);
    }
}

const INDENTATION = '  ';

const utils = {
    LINE_BREAK: '\n',

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
        return split(text).map(line => INDENTATION.repeat(indentation) + line).join(utils.LINE_BREAK);
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
        return split(text).map(line => line.trim().replace(/\s+/g, ' ')).join(utils.LINE_BREAK);
    },

    /**
     * Creates a new Lines object to build text file.
     * @returns {Lines}
     */
    lines() {
        return new Lines();
    },

    /**
     * Creates a new Table object to build tables.
     * @returns {StrippedTable}
     */
    table() {
        return new StrippedTable({
            chars: {
                'top': '',
                'top-mid': '',
                'top-left': '',
                'top-right': '',
                'bottom': '',
                'bottom-mid': '',
                'bottom-left': '',
                'bottom-right': '',
                'left': '|',
                'left-mid': '',
                'mid': '',
                'mid-mid': '',
                'right': '|',
                'right-mid': '',
                'middle': '|'
            },
            styles: {
                border: [],
                head: []
            }
        });
    }
};

module.exports = utils;