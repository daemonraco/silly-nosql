"use strict";
/// <reference path="../definitions/jsonpath-plus.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const jsonpath = require("jsonpath-plus");
class SillyTable {
    //
    // Constructor.
    constructor(name, connection) {
        this._data = [];
        this._name = name;
        this._connection = connection;
        this._paths = this._connection.paths();
        this._padding = this._connection.compressed() ? 0 : 2;
        this.load();
    }
    //
    // Public methods.
    delete(id) {
        let out = false;
        const item = this.getById(id);
        if (item) {
            this._data.splice(this._data.indexOf(item), 1);
            this.save();
            out = true;
        }
        return out;
    }
    getById(id) {
        const result = this.search(`$..[?(@._id=='${id}')]`);
        return result.length === 1 ? result[0] : null;
    }
    insert(data) {
        if (!data._id) {
            data._id = this._sequence.next();
        }
        else {
            if (this.getById(data._id)) {
                throw `Duplicated id '${data._id}'`;
            }
        }
        this._data.push(data);
        this.save();
        return true;
    }
    save() {
        return fs.writeFileSync(this._path, JSON.stringify(this._data, null, this._padding));
    }
    search(query) {
        return jsonpath({ path: query, json: this._data });
    }
    update(data) {
        let out = false;
        if (!data._id) {
            throw `Updating object has no ID.`;
        }
        const item = this.getById(data._id);
        if (item) {
            const pos = this._data.indexOf(item);
            this._data[pos] = data;
            this.save();
            out = true;
        }
        return out;
    }
    truncate() {
        this._data = [];
        this.save();
        this._sequence.truncate();
    }
    //
    // Protected methods.
    load() {
        this._path = path.join(this._paths.tables, `${this._name}.tab`);
        if (fs.existsSync(this._path)) {
            const raw = fs.readFileSync(this._path);
            this._data = JSON.parse(`${raw}`);
        }
        else {
            this.save();
        }
        this._sequence = this._connection.sequence(this._name);
    }
}
exports.SillyTable = SillyTable;
