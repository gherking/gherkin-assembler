'use strict';

const path = require('path');
const Tag = require(path.resolve('./lib/ast/Tag.js'));

const expect = require('chai').expect;

describe('Ast.Tag', () => {
    it('should represent an Ast Tag instance', () => {
        const tag = new Tag('tagName');
        expect(tag).to.be.instanceOf(Tag);
        expect(tag.name).to.equal('tagName');
    });
});