"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongooseTableAdapter {
    constructor(table, connection) {
        this._connection = connection;
        this._table = table;
    }
}
exports.MongooseTableAdapter = MongooseTableAdapter;
