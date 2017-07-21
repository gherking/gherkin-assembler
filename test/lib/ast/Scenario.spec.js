'use strict';

const path = require('path');
const fs = require('fs');
const Scenario = require(path.resolve('lib/ast/Scenario.js'));
const Step = require(path.resolve('lib/ast/Step.js'));
const Tag = require(path.resolve('lib/ast/Tag.js'));

const scenarioAst = require('../../data/scenario.json');
const scenarioFeature = fs.readFileSync(path.resolve('test/data/scenario.txt'), 'utf8');

const expect = require('chai').expect;

describe('Ast.Scenario', () => {
    it('should represent an Ast Scenario instance', () => {
        const scenario = new Scenario('Scenario', 'this is a   scenario', 'this  is a good scenario\n  a');
        expect(scenario).to.be.instanceOf(Scenario);
        expect(scenario.keyword).to.equal('Scenario');
        expect(scenario.name).to.equal('this is a scenario');
        expect(scenario.description).to.equal('this is a good scenario\na');
        expect(scenario.tags).to.eql([]);
        expect(scenario.steps).to.eql([]);
    });
    
    it('should not parse regular objects', () => {
        expect(() => Scenario.parse()).to.throw(TypeError);
        expect(() => Scenario.parse({type: 'Type'})).to.throw(TypeError);
    });
    
    it('should parse Gherkin Ast Scenario type to Scenario', () => {
        const scenario = Scenario.parse(scenarioAst);
        expect(scenario).to.be.instanceOf(Scenario);
        expect(scenario.keyword).to.equal(scenarioAst.keyword);
        expect(scenario.name).to.equal(scenarioAst.name);
        expect(scenario.tags).to.have.lengthOf(2);
        scenario.tags.forEach((tag, i) => {
            expect(tag).to.be.instanceOf(Tag);
            expect(tag.name).to.equal(scenarioAst.tags[i].name);
        });
    });

    it('should have proper string representation', () => {
        const scenario = Scenario.parse(scenarioAst);
        expect(scenario.toString()).to.equal(scenarioFeature);
    });
});