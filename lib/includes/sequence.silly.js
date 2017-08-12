"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class SillySequence {
    //
    // Constructor.
    constructor(name, connection) {
        this._value = 0;
        this._name = name;
        this._connection = connection;
        this._paths = this._connection.paths();
        this.load();
    }
    //
    // Public methods.
    next() {
        this._value++;
        this.save();
        return this._value;
    }
    truncate() {
        this._value = 0;
        this.save();
    }
    //
    // Protected methods.
    load() {
        this._path = path.join(this._paths.sequences, `${this._name}.seq`);
        if (fs.existsSync(this._path)) {
            const raw = fs.readFileSync(this._path);
            this._value = parseInt(`${raw}`);
        }
        else {
            this._value = 0;
            this.save();
        }
    }
    save() {
        return fs.writeFileSync(this._path, this._value);
    }
}
exports.SillySequence = SillySequence;
