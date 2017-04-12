'use strict';

const fs = require('fs');
const path = require('path');

const assembler = {};
assembler.Ast = {};

fs.readdirSync('./ast').forEach(file => {
    const className = file.replace('.js', '');
    assembler.Ast[className] = require(`./ast/${file}`);
});

console.log(assembler);

module.exports = assembler;