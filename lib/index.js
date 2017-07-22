'use strict';

const fs = require('fs');
const path = require('path');

const utils = require('./utils');

const assembler = {};
assembler.Ast = {};

fs.readdirSync('./ast').forEach(file => {
    const className = file.replace('.js', '');
    assembler.Ast[className] = require(`./ast/${file}`);
});

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