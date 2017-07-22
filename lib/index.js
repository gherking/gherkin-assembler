'use strict';

const fs = require('fs');
const path = require('path');

const utils = require('./utils');

const assembler = {};
assembler.Ast = {};

fs.readdirSync(path.resolve('lib/ast')).forEach(file => {
    const className = file.replace('.js', '');
    assembler.Ast[className] = require(path.resolve(`lib/ast/${file}`));
});

/**
 * @typedef {Object} AssemblerConfig
 * @property {boolean} oneTagPerLine Should tags be rendered one per line?
 */

/** @type {AssemblerConfig} */
const DEFAULT_OPTIONS = {
    oneTagPerLine: false
};

/**
 * Formats the given Gherkin Document to text.
 * @param {GherkinDocument|Array<GherkinDocument>} document
 * @param {AssemblerConfig|Object} options
 * @returns {string|Array<string>}
 */
assembler.format = (document, options) => {
    options = Object.assign({}, DEFAULT_OPTIONS, options || {});
    assembler.Ast.Tag.setMultiLine(options.oneTagPerLine);
    if (Array.isArray(document)) {
        return document.map(doc => assembler.format(doc));
    }
    if (!(document instanceof assembler.Ast.GherkinDocument)) {
        throw new TypeError(`The passed object is not a GherkinDocument!` + document);
    }
    return document.toString();
};

/**
 * Set line endings for generated text
 * @param {boolean} crLf In case of true, line ending
 *  will be CRLF (Windows), otherwise LF (Unix).
 *  It is LF (Unix) by default.
 */
assembler.setCrLf = crLf => {
    utils.LINE_BREAK = crLf ? '\r\n' : '\n';
};

module.exports = assembler;