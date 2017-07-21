'use strict';

const path = require('path');
const DocString = require(path.resolve('./lib/ast/DocString.js'));

const expect = require('chai').expect;

describe('Ast.DocString', () => {
    it('should represent an Ast DocString instance', () => {
        const docString = new DocString('Hello\nWorld');
        expect(docString).to.be.instanceOf(DocString);
        expect(docString.content).to.equal('Hello\nWorld');
    });
    
    it('should not parse regular objects', () => {
        expect(() => DocString.parse()).to.throw(TypeError);
        expect(() => DocString.parse({type: 'Type'})).to.throw(TypeError);
    });
    
    it('should parse Gherkin Ast DocString type to DocString', () => {
        const docString = DocString.parse({type: 'DocString', content: 'Hello\nWorld'});
        expect(docString).to.be.instanceOf(DocString);
        expect(docString.content).to.equal('Hello\nWorld');
    });

    it('should have proper string representation', () => {
        const docString = new DocString('Hello\nWorld');
        expect(docString.toString()).to.equal('"""\nHello\nWorld\n"""');
    });
});