'use strict';

class Tag {
    constructor(name) {
        this.name = name;
    }
    
    static parse(obj) {
        if (!obj || obj.type !== 'Tag') {
            throw new TypeError('The given object is not a Tag!');
        }
        return new Tag(obj.name);
    }

    toString() {
        return this.name;
    }
}

module.exports = Tag;