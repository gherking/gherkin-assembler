'use strict';

const path = require('path');
const fs = require('fs');

const api = require(path.resolve('lib/index.js'));
const utils = require(path.resolve('lib/utils.js'));

const featureAst = api.Ast.GherkinDocument.parse(require('./data/base.ast.json'));
const featureFile = fs.readFileSync(path.resolve('test/data/base.feature'), 'utf8');

const expect = require('chai').expect;

describe('API', () => {
    describe('.format()', () => {
        it('should throw error if not correct argument passed', () => {
            expect(() => api.format({})).to.throw(TypeError);
        });

        it('should format simple document', () => {
            expect(api.format(featureAst)).to.equal(featureFile);
        });

        it('should format array of documents', () => {
            expect(api.format([featureAst, featureAst])).to.eql([featureFile, featureFile]);
        });
    });

    describe('.setCrLf()', () => {
        after(() => api.setCrLf(false));

        it('should change line end to CRLF and back to LF', () => {
            api.setCrLf(true);
            expect(utils.LINE_BREAK).to.contain('\r');
            api.setCrLf(false);
            expect(utils.LINE_BREAK).to.not.contain('\r');
        });
    })
});