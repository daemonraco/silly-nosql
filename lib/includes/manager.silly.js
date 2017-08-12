"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_silly_1 = require("./connection.silly");
class SillyNoSQL {
    //
    // Constructor.
    constructor() {
        //
        // Protected properties.
        this.connections = {};
    }
    //
    // Public methods.
    connect(dbpath, options = {}) {
        if (!this.connections[dbpath]) {
            this.connections[dbpath] = new connection_silly_1.SillyConnection(dbpath, options);
        }
        return this.connections[dbpath];
    }
    //
    // Public class methods.
    static instance() {
        if (!this._instance) {
            this._instance = new SillyNoSQL();
        }
        return this._instance;
    }
}
exports.SillyNoSQL = SillyNoSQL;
