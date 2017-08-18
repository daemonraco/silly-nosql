"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_silly_1 = require("../manager.silly");
const mongoose_connection_adapter_1 = require("./mongoose-connection.adapter");
const mongoose_schema_adapter_1 = require("./mongoose-schema.adapter");
class MongooseAdapter_KnownSchemas {
    constructor(schema, table) {
        this.schema = schema;
        this.table = table;
    }
}
exports.MongooseAdapter_KnownSchemas = MongooseAdapter_KnownSchemas;
class MongooseAdapter {
    constructor() {
        this._knownSchemas = {};
        this.Schema = mongoose_schema_adapter_1.MongooseSchemaAdapter;
    }
    connect(dsn, options) {
        const dsnPattern = /mongodb:\/\/localhost((:[0-9]+)?)\/(.*)/;
        const path = dsn.match(dsnPattern) ? dsn.replace(dsnPattern, '$3') : `./${dsn}`;
        this.connection = new mongoose_connection_adapter_1.MongooseConnectionAdapter(manager_silly_1.SillyNoSQL.instance().connect(path));
        return this.connection;
    }
    model(name, schema = null) {
        let out;
        if (schema) {
            if (typeof this._knownSchemas[name] !== 'undefined') {
                throw `Schema '${name}' is already initialized.`;
            }
            const table = this.connection.$table(name);
            this._knownSchemas[name] = new MongooseAdapter_KnownSchemas(schema, table);
            out = this._knownSchemas[name].table;
        }
        else {
            if (typeof this._knownSchemas[name] === 'undefined') {
                throw `Schema '${name}' is not initialized.`;
            }
        }
        return out;
    }
}
exports.MongooseAdapter = MongooseAdapter;
