'use strict';

const utils = require('../utils');
const TableRow = require('./TableRow');

/**
 * Model of a Cucumber DataTable step argument
 * @class
 */
class DataTable {
    /**
     * @constructor
     * @param {Array<TableRow>} [rows] The rows of the table.
     */
    constructor(rows) {
        /** @member {Array<TableRow>} */
        this.rows = Array.isArray(rows) ? rows : [];
    }

    /**
     * Parses a DataTable object, based on the passed AST object.
     * @param {Object} obj
     * @returns {DataTable}
     * @throws {TypeError} If the passed object is not a DataTable.
     */
    static parse(obj) {
        if (!obj || obj.type !== 'DataTable') {
            throw new TypeError('The given object is not a DocString!');
        }
        const table = new DataTable();
        if (Array.isArray(obj.rows)) {
            table.rows = obj.rows.map(row => TableRow.parse(row));
        }
        return table;
    }

    /**
     * Returns the Cucumber feature file
     * representative text of the DataTable.
     * @returns {string}
     */
    toString() {
        const table = utils.table();
        this.rows.forEach(row => {
            table.push(row.toArray());
        });
        return table.toString();
    }
}

module.exports = DataTable;