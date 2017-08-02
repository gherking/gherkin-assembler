# gherkin-assembler

[![Build Status](https://travis-ci.org/szikszail/gherkin-assembler.svg?branch=master)](https://travis-ci.org/szikszail/gherkin-assembler) [![dependency Status](https://david-dm.org/szikszail/gherkin-assembler.svg)](https://david-dm.org/szikszail/gherkin-assembler) [![devDependency Status](https://david-dm.org/szikszail/gherkin-assembler/dev-status.svg)](https://david-dm.org/szikszail/gherkin-assembler#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/github/szikszail/gherkin-assembler/badge.svg?branch=master)](https://coveralls.io/github/szikszail/gherkin-assembler?branch=master)

It allows to convert Gherkin AST to feature file string.

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
  * `{AssemblerConfig} options` - options to set attributes of formatting.
  
**Returns:** `{string|Array<string>}`

```javascript
'use strict';

const fs = require('fs');
const assembler = require('gherkin-assembler');
const document = assembler.objectToAST(require('./login.ast.json'));

fs.writeFileSync('./login.feature', assembler.format(document), 'utf8');
```

### `AssemblerConfig`

By passing an `AssemblerConfig` object to format method (or other Ast type methods where it's applicable) it can be set, how feature file text is rendered.

| Option | Description | Default |
|:-------|:------------|:--------|
| `oneTagPerLine` | Should tags rendered separately, one by line? | `false`, i.e. all tag of a scenario, feature, etc will be rendered in the same line |
| `compact` | Should empty lines be skipped, removed from the result? | `false`, i.e. there will be empty lines in appropriate places |
| `lineBreak` | The line break character(s). | `\n`, i.e. it uses Unix line break, to set Windows style, set `\r\n` |
| `indentation` | The indentation character(s). | `'  '`, i.e. it uses two space character to add indentation where it's appropriate | 

## AST

The API provides types to be able to handle different parts of Gherkin feature files.

```javascript
'use strict';
const {AST} = require('gherkin-assemble');
console.log(Object.keys(AST));
// Background,...,Feature,GherkinDocument,...,Tag
```

### `GherkinDocument`

Model of a complete Gherkin document, i.e. feature file.

#### Fields

  * `{Feature} feature` - The feature which this document contains.
  
#### Methods

  * `new GherkinDocument() : GherkinDocument` - Creates a new instance.
  * `{GherkinDocument}.toString({AssemblerConfig} [options]) : string` - Converts the document to string, i.e. formats it.
  * `{GherkinDocument}.clone() : GherkinDocument` - Clones the document.
  * `GherkinDocumnet.parse({Object} object) : GherkinDocument` - Parses the given [GherkinDocument object](/test/data/base.ast.json#2) to a `GherkinDocument`.

### `Feature`

Model of a Gherkin feature.

```gherkin
Feature: Hello world
  As a smo
  I want to do smth
  So that I am smth
```

#### Fields

 * `{string} keyword` - The keyword of the feature, e.g. `"Feature"`.
 * `{string} name` - The name of the feature, e.g. `"Hello world"`.
 * `{string} description` - The description of the feature, e.g. `"As a smo\nI want to do smth\nSo that I am smth"`.
 * `{string} language` - Tne of the supported [Gherkin language](https://github.com/cucumber/cucumber/wiki/Spoken-languages), default: `"en"`.
 * `{Array<Tag>} tags` - Tags of the feature.
 * `{Array<Background|Scenario|ScenarioOutline>} elements` - The elements of the feature, i.e. scenario, background or scenario outline.

#### Methods

 * `new Feature(keyword, name, description, language) : Feature` - Creates a new `Feature` object, with the given values.
 * `{Feature}.toString({AssemblerConfig}) : string` - Converts the feature to string, i.e. formats it.
 * `{Feature}.clone() : Feature` - Clones the feature.
 * `Feature.parse({Object} object) : Feature` - Parses the given [Feature object](/test/data/base.ast.json#4) to a `Feature`.

### `Background`

_TBD_

### `Scenario`

_TBD_

### `ScenarioOutline`

_TBD_

### `Examples`

_TBD_

### `Step`

_TBD_

### `Tag`

_TBD_

### `DocString`

_TBD_

### `DataTable`

_TBD_

### `TableRow`

_TBD_

### `TableCell`

_TBD_

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