'use strict';

const assembler = {};

const {GherkinDocument} = require('gherkin-ast');

/**
 * Converts the given Object to Gherkin Document.
 * @param {Object} document
 * @returns {GherkinDocument}
 */
assembler.objectToAST = document => {
    return GherkinDocument.parse(document);
};


/**
 * Formats the given Gherkin Document to text.
 * @param {GherkinDocument|Array<GherkinDocument>} document
 * @param {FormatConfig|Object} [options]
 * @returns {string|Array<string>}
 */
assembler.format = (document, options) => {
    if (Array.isArray(document)) {
        return document.map(doc => assembler.format(doc, options));
    }
    if (!(document instanceof GherkinDocument)) {
        throw new TypeError(`The passed object is not a GherkinDocument!` + document);
    }
    return document.toString(options);
};

module.exports = assembler;