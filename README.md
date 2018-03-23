# gherkin-assembler

[![Build Status](https://travis-ci.org/szikszail/gherkin-assembler.svg?branch=master)](https://travis-ci.org/szikszail/gherkin-assembler) [![dependency Status](https://david-dm.org/szikszail/gherkin-assembler.svg)](https://david-dm.org/szikszail/gherkin-assembler) [![devDependency Status](https://david-dm.org/szikszail/gherkin-assembler/dev-status.svg)](https://david-dm.org/szikszail/gherkin-assembler#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/github/szikszail/gherkin-assembler/badge.svg?branch=master)](https://coveralls.io/github/szikszail/gherkin-assembler?branch=master)

It allows to convert [Gherkin AST](http://github.com/szikszail/gherkin-ast) to feature file string.

## API

### `objectToAST(document)`

The `objectToAST` API method converts the given Gherkin object into `GherkinDocument` object.

A complete sample Gherkin object can be found here: [Complete Gherkin object](/test/data/base.ast.json).

**Params:**
  * `{Object} documet` - a single Gherkin object
  
**Returns:** `{GherkinDocument}`

### `format(document, options)`

The `format` API method formats the given Gherkin Document(s) to string (which could be written out to feature file(s)).

**Params:**
  * `{GherkinDocument|Array<GherkinDocument>} document` - a single or multiple Gherkin Documents given in it's AST model.
  * `{FormatConfig} options` - options to set attributes of formatting.
  
**Returns:** `{string|Array<string>}`

```javascript
'use strict';

const fs = require('fs');
const assembler = require('gherkin-assembler');
const document = assembler.objectToAST(require('./login.ast.json'));

fs.writeFileSync('./login.feature', assembler.format(document), 'utf8');
```

### `FormatConfig`

By passing an `FormatConfig` object to format method (or other Ast type methods where it's applicable) it can be set, how feature file text is rendered.

| Option | Description | Default |
|:-------|:------------|:--------|
| `oneTagPerLine` | Should tags rendered separately, one by line? | `false`, i.e. all tag of a scenario, feature, etc will be rendered in the same line |
| `separateStepGroups` | Should step groups (when-then) be separated? | `false` |
| `compact` | Should empty lines be skipped, removed from the result? | `false`, i.e. there will be empty lines in appropriate places |
| `lineBreak` | The line break character(s). | `\n`, i.e. it uses Unix line break, to set Windows style, set `\r\n` |
| `indentation` | The indentation character(s). | `'  '`, i.e. it uses two space character to add indentation where it's appropriate | 

## Parsing feature files to Gherkin object

Although this package does not contain method to parse feature file to Gherkin object, you can use the [gherkin](https://github.com/cucumber/cucumber/tree/master/gherkin) subpackage of [CucumberJS](https://github.com/cucumber/cucumber).

```javascript
'use strict';
const fs = require('fs');
const {Parser} = require('gherkin');
const parser = new Parser();
const document = parser.parse(fs.readFileSync('./login.feature'));

// use objectToAST and format to write it to file again
```