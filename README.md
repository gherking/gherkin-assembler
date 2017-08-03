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

Model of a Gherkin Background scenario.

```gherkin
Background: Some background steps
  Given this is a given step
  And this is a given step too
  When this is a when step
  And this is a when step too
  Then it should be a then step
  And it should be a then step too
```

#### Fields

 * `{string} keyword` - The keyword of the background, e.g. `"Background"`.
 * `{string} name` - The name of the background, e.g. `"Some background steps"`.
 * `{string} description` - The description of the background.
 * `{Array<Step>} steps` - The steps of the background.

#### Methods

 * `new Background(keyword, name, description) : Background` - Creates a new `Background` object, with the given values.
 * `{Background}.toString({AssemblerConfig}) : string` - Converts the background to string, i.e. formats it.
 * `{Background}.clone() : Background` - Clones the background.
 * `Background.parse({Object} object) : Background` - Parses the given [Background object](/test/data/base.ast.json#33) to a `Background`.

### `Scenario`

Model of a Gherkin scenario.

```gherkin
@tag2 @tag3
Scenario: Name of scenario
Description of the scenario

  Given this is a given step
  And this is a given step too
```

#### Fields

 * `{string} keyword` - The keyword of the scenario, e.g. `"Scenario"`.
 * `{string} name` - The name of the scenario, e.g. `"Name of scenario"`.
 * `{string} description` - The description of the scenario, e.g. `"Description of the scenario"`.
 * `{Array<Step>} steps` - The steps of the scenario.
 * `{Array<Tag>} tags` - Tags of the scenario.

#### Methods

 * `new Scenario(keyword, name, description) : Scenario` - Creates a new `Scenario` object, with the given values.
 * `{Scenario}.toString({AssemblerConfig}) : string` - Converts the scenario to string, i.e. formats it.
 * `{Scenario}.clone() : Scenario` - Clones the scenario.
 * `Scenario.parse({Object} object) : Scenario` - Parses the given [Scenario object](/test/data/base.ast.json#98) to a `Scenario`.

### `ScenarioOutline`

Model of a Gherkin Scenario outline.

```gherkin
@tag2 @tag(3)
Scenario Outline: Name of outline <key>
  Given this is a given step
  And this is a given step too
  When this is a when step <key>
  And this is a when step too
  Then it should be a then step
  And it should be a then step too

@tagE1
  Examples: First examples
    | key    |
    | value1 |
```

#### Fields

 * `{string} keyword` - The keyword of the scenario outline, e.g. `"Scenario Outline"`.
 * `{string} name` - The name of the scenario outline, e.g. `"Name of outline <key>"`.
 * `{string} description` - The description of the scenario outline.
 * `{Array<Step>} steps` - The steps of the scenario outline.
 * `{Array<Tag>} tags` - Tags of the scenario outline.
 * `{Array<Examples>} examples` - Examples of the scenario outline.

#### Methods

 * `new ScenarioOutline(keyword, name, description) : ScenarioOutline` - Creates a new `ScenarioOutline` object, with the given values.
 * `{ScenarioOutline}.toString({AssemblerConfig}) : string` - Converts the scenario outline to string, i.e. formats it.
 * `{ScenarioOutline}.clone() : ScenarioOutline` - Clones the scenario outline.
 * `ScenarioOutline.parse({Object} object) : ScenarioOutline` - Parses the given [ScenarioOutline object](/test/data/base.ast.json#343) to a `ScenarioOutline`.
 
### `Examples`

Model of a Gherkin Scenario outline Examples table.

```gherkin
@tagE1
  Examples: First examples
    | key    |
    | value1 |
```

#### Fields

 * `{string} keyword` - The keyword of the examples table, e.g. `"Examples"`.
 * `{string} name` - The name of the examples table, e.g. `"First examples"`.
 * `{Array<Tag>} tags` - Tags of the examples table.
 * `{TableRow} header` - The header row of the examples table, with column name(s).
 * `{Array<TableRow>} body` - The data rows of the examples table.

#### Methods

 * `new Examples(keyword, name, description) : Examples` - Creates a new `Examples` object, with the given values.
 * `{Examples}.toString({AssemblerConfig}) : string` - Converts the examples table to string, i.e. formats it.
 * `{Examples}.clone() : Examples` - Clones the examples table.
 * `Examples.parse({Object} object) : Examples` - Parses the given [Examples object](/test/data/base.ast.json#426) to a `Examples`.

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