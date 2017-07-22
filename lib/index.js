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
 * Formats the given Gherkin Document to text.
 * @param {GherkinDocument|Array<GherkinDocument>} document
 * @param {AssemblerConfig|Object} [options]
 * @returns {string|Array<string>}
 */
assembler.format = (document, options) => {
    if (Array.isArray(document)) {
        return document.map(doc => assembler.format(doc, options));
    }
    if (!(document instanceof assembler.Ast.GherkinDocument)) {
        throw new TypeError(`The passed object is not a GherkinDocument!` + document);
    }
    return document.toString(options);
};

module.exports = assembler;