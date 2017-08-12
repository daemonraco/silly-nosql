/// <reference path="../definitions/jsonpath-plus.d.ts" />

import * as fs from 'fs';
import * as path from 'path';
import * as jsonpath from 'jsonpath-plus';

import { SillyConnection } from './connection.silly';
import { SillySequence } from './sequence.silly';

export class SillyTable {
    //
    // Protected properties.
    protected _connection: SillyConnection;
    protected _data: any[] = [];
    protected _name: string;
    protected _padding: number;
    protected _path: string;
    protected _paths: { [name: string]: string };
    protected _sequence: SillySequence;
    //
    // Constructor.
    constructor(name: string, connection: SillyConnection) {
        this._name = name;
        this._connection = connection;

        this._paths = this._connection.paths();
        this._padding = this._connection.compressed() ? 0 : 2;

        this.load();
    }
    //
    // Public methods.
    public delete(id: number): boolean {
        let out = false;

        const item = this.getById(id);
        if (item) {
            this._data.splice(this._data.indexOf(item), 1);
            this.save();

            out = true;
        }

        return out;
    }
    public getById(id: number): any {
        const result = this.search(`$..[?(@._id=='${id}')]`);
        return result.length === 1 ? result[0] : null;
    }
    public insert(data: { [name: string]: any }): boolean {
        if (!data._id) {
            data._id = this._sequence.next();
        } else {
            if (this.getById(data._id)) {
                throw `Duplicated id '${data._id}'`;
            }
        }

        this._data.push(data);
        this.save();

        return true;
    }
    public save(): any {
        return fs.writeFileSync(this._path, JSON.stringify(this._data, null, this._padding));
    }
    public search(query: string): any {
        return jsonpath({ path: query, json: this._data });
    }
    public update(data: { [name: string]: any }): boolean {
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
    public truncate(): void {
        this._data = [];
        this.save();

        this._sequence.truncate();
    }
    //
    // Protected methods.
    protected load(): void {
        this._path = path.join(this._paths.tables, `${this._name}.tab`);

        if (fs.existsSync(this._path)) {
            const raw = fs.readFileSync(this._path);
            this._data = JSON.parse(`${raw}`);
        } else {
            this.save();
        }

        this._sequence = this._connection.sequence(this._name);
    }
}