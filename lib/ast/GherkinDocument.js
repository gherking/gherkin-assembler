'use strict';

const Feature = require('./Feature');
const Comment = require('./Comment');

class GherkinDocument {
    constructor(feature) {
        this.feature = null;
        this.comments = [];
    }

    static parse(obj) {
        if (!obj || obj.type !== 'GherkinDocument') {
            throw new TypeError('The given object is not a GherkinDocument!');
        }
        const document = new GherkinDocument();
        document.feature = Feature.parse(obj.feature);
        if (Array.isArray(obj.comments)) {
            document.comments = obj.comments.map(comment => Comment.parse(comment));
        }
        return document;
    }
}

module.exports = GherkinDocument;