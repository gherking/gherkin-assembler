'use strict';

const path = require('path');
const fs = require('fs');
const Background = require(path.resolve('lib/ast/Background.js'));
const Step = require(path.resolve('lib/ast/Step.js'));

const backgroundAst = require('../data/background.json');
const backgroundFeature = fs.readFileSync(path.resolve('test/data/background.txt'), 'utf8');

const expect = require('chai').expect;

describe('Ast.Background', () => {
    it('should represent an Ast Background instance', () => {
        const background = new Background('Background', 'this is a  background', 'this  is a good background\r\n  a');
        expect(background).to.be.instanceOf(Background);
        expect(background.keyword).to.equal('Background');
        expect(background.name).to.equal('this is a background');
        expect(background.description).to.equal('this is a good background\r\na');
        expect(background.steps).to.eql([]);
    });
    
    it('should not parse regular objects', () => {
        expect(() => Background.parse()).to.throw(TypeError);
        expect(() => Background.parse({type: 'Type'})).to.throw(TypeError);
    });
    
    it('should parse Gherkin Ast Background type to Background', () => {
        const background = Background.parse(backgroundAst);
        expect(background).to.be.instanceOf(Background);
        expect(background.keyword).to.equal(backgroundAst.keyword);
        expect(background.name).to.equal(backgroundAst.name);
    });

    it('should have proper string representation', () => {
        const background = Background.parse(backgroundAst);
        expect(background.toString()).to.equal(backgroundFeature);
    });
});