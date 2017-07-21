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

assembler.setCrLf = crLf => {
    utils.LINE_BREAK = crLf ? '\r\n' : '\n';
};

module.exports = assembler;