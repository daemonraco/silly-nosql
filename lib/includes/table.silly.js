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
    all() {
        return this._data;
    }
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
    drop() {
        this._data = [];
        fs.unlinkSync(this._path);
        return !fs.existsSync(this._path);
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
        return data;
    }
    name() {
        return this._name;
    }
    save() {
        fs.writeFileSync(this._path, JSON.stringify(this._data, null, this._padding));
    }
    search(query) {
        return jsonpath({ path: query, json: this._data });
    }
    searchAndUpdate(query, data) {
        const found = this.search(query);
        if (typeof data._id !== 'undefined') {
            delete data._id;
        }
        for (let k in found) {
            found[k] = Object.assign(found[k], data);
            this.update(found[k]);
        }
        return this.search(query);
    }
    update(data) {
        if (!data._id) {
            throw `Updating object has no ID.`;
        }
        const item = this.getById(data._id);
        if (item) {
            const pos = this._data.indexOf(item);
            this._data[pos] = data;
            this.save();
        }
        return data;
    }
    updateWhere(query, data) {
        const found = this.where(query);
        if (typeof data._id !== 'undefined') {
            delete data._id;
        }
        for (let k in found) {
            found[k] = Object.assign(found[k], data);
            this.update(found[k]);
        }
        return this.where(query);
    }
    truncate() {
        this._data = [];
        this.save();
        this._sequence.truncate();
    }
    where(query) {
        let out = [];
        let firstTime = true;
        for (let key in query) {
            const partial = jsonpath({ path: `$..[?(@.${key}=='${query[key]}')]`, json: this._data });
            if (firstTime) {
                out = partial;
            }
            else {
                out = out.filter(entry => {
                    return partial.indexOf(entry) !== -1;
                });
            }
            firstTime = false;
        }
        return out;
    }
    //
    // Protected methods.
    load() {
        this._path = SillyTable.buildTableName(this._name, this._paths.tables);
        if (fs.existsSync(this._path)) {
            const raw = fs.readFileSync(this._path);
            this._data = JSON.parse(`${raw}`);
        }
        else {
            this.save();
        }
        this._sequence = this._connection.sequence(this._name);
    }
    //
    // Public class methods.
    static exists(name, directory) {
        return fs.existsSync(SillyTable.buildTableName(name, directory));
    }
    //
    // Protected class methods.
    static buildTableName(name, directory) {
        return path.join(directory, `${name}.tab`);
    }
}
exports.SillyTable = SillyTable;
