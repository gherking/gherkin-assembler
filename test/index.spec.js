'use strict';

const path = require('path');
const fs = require('fs');

const api = require(path.resolve('lib/index.js'));
const {GherkinDocument} = require('gherkin-ast');

const featureAst = GherkinDocument.parse(require('./data/base.ast.json'));
const featureFile = fs.readFileSync(path.resolve('test/data/base.feature'), 'utf8');
const multiLineFeatureFile = fs.readFileSync(path.resolve('test/data/base-multiline.feature'), 'utf8');
const compactFeatureFile = fs.readFileSync(path.resolve('test/data/base-compact.feature'), 'utf8');

const expect = require('chai').expect;

describe('API', () => {
    describe('.format()', () => {
        it('should throw error if not correct argument passed', () => {
            expect(() => api.format({})).to.throw(TypeError);
        });

        it('should format simple document', () => {
            expect(api.format(featureAst).split(/\r?\n/g)).to.eql(featureFile.split(/\r?\n/g));
        });

        it('should format array of documents', () => {
            const result = api.format([featureAst, featureAst]);
            result.forEach(res => {
                expect(res.split(/\r?\n/g)).to.eql(featureFile.split(/\r?\n/g));
            });
        });

        it('should put each tag in new line, if set', () => {
            expect(api.format(featureAst, {oneTagPerLine: true}).split(/\r?\n/g)).to.eql(multiLineFeatureFile.split(/\r?\n/g));
        });

        it('should remove empty lines, if set', () => {
            expect(api.format(featureAst, {compact: true}).split(/\r?\n/g)).to.eql(compactFeatureFile.split(/\r?\n/g));
        });
    });

    describe('.objectToAST()', () => {
        it('should convert simple object to GherkinDocument', () => {
            expect(api.objectToAST({type: 'GherkinDocument'})).to.be.instanceOf(GherkinDocument);
        });
    });
});