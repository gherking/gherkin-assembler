'use strict';

const assembler = {};
/** @type {Object} */
assembler.AST = {};

assembler.AST.GherkinDocument = require('./ast/GherkinDocument');
assembler.AST.Feature = require('./ast/Feature');
assembler.AST.Tag = require('./ast/Tag');
assembler.AST.Background = require('./ast/Background');
assembler.AST.Scenario = require('./ast/Scenario');
assembler.AST.ScenarioOutline = require('./ast/ScenarioOutline');
assembler.AST.Step = require('./ast/Step');
assembler.AST.DocString = require('./ast/DocString');
assembler.AST.DataTable = require('./ast/DataTable');
assembler.AST.Examples = require('./ast/Examples');
assembler.AST.TableRow = require('./ast/TableRow');
assembler.AST.TableCell = require('./ast/TableCell');

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