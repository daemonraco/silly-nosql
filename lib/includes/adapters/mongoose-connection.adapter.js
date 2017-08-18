"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_table_adapter_1 = require("./mongoose-table.adapter");
class MongooseConnectionAdapter {
    constructor(conn) {
        this._tables = {};
        this._connection = conn;
    }
    on(type, callback) {
    }
    $table(name) {
        if (typeof this._tables[name] === 'undefined') {
            this._tables[name] = new mongoose_table_adapter_1.MongooseTableAdapter(this._connection.table(name), this);
        }
        return this._tables[name];
    }
}
exports.MongooseConnectionAdapter = MongooseConnectionAdapter;
