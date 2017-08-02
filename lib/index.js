'use strict';

const fs = require('fs');
const path = require('path');

const assembler = {};
/** @type {Object} */
assembler.AST = {};

fs.readdirSync(path.resolve('lib/ast')).forEach(file => {
    const className = file.replace('.js', '');
    Object.defineProperty(assembler.AST, className, {
        value: require(path.resolve(`lib/ast/${file}`)),
        writable: false
    });
});

/**
 * Converts the given Object to Gherkin Document.
 * @param {Object} document
 * @returns {GherkinDocument}
 */
assembler.objectToAST = document => {
    return assembler.AST.GherkinDocument.parse(document);
};


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
    if (!(document instanceof assembler.AST.GherkinDocument)) {
        throw new TypeError(`The passed object is not a GherkinDocument!` + document);
    }
    return document.toString(options);
};

module.exports = assembler;