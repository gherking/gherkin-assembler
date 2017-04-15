'use strict';

const path = require('path');
const Step = require(path.resolve('lib/ast/Step.js'));
const DocString = require(path.resolve('lib/ast/DocString.js'));

const expect = require('chai').expect;

const stepAst = {
    type: 'Step', 
    keyword: 'When ', 
    text: 'this is a when step',
    argument: {
        type: 'DocString',
        content: 'Hello\nWorld'
    }
};
        

describe('Ast.Step', () => {
    it('should represent an Ast Step instance', () => {
        const step = new Step('When ', 'this is a when step');
        expect(step).to.be.instanceOf(Step);
        expect(step.keyword).to.equal('When');
        expect(step.text).to.equal('this is a when step');
    });
    
    it('should not parse regular objects', () => {
        expect(() => Step.parse()).to.throw(TypeError);
        expect(() => Step.parse({type: 'Type'})).to.throw(TypeError);
    });
    
    it('should parse Gherkin Ast Step type to Step', () => {
        const step = Step.parse(stepAst);
        expect(step).to.be.instanceOf(Step);
        expect(step.keyword).to.equal('When');
        expect(step.text).to.equal('this is a when step');
        expect(step.argument).to.be.instanceOf(DocString);
    });

    it('should have proper string representation', () => {
        const step = new Step('When ', 'this is a when step');
        step.argument = new DocString('Hello\nWorld');
        expect(step.toString()).to.equal('When this is a when step\n  """\n  Hello\n  World\n  """');
    });
});