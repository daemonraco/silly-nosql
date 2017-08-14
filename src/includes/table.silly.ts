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
    public all(): any[] {
        return this._data;
    }
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
    public drop(): any {
        this._data = [];
        fs.unlinkSync(this._path);
        return !fs.existsSync(this._path);
    }
    public getById(id: number): any {
        const result = this.search(`$..[?(@._id=='${id}')]`);
        return result.length === 1 ? result[0] : null;
    }
    public insert(data: { [name: string]: any }): any {
        if (!data._id) {
            data._id = this._sequence.next();
        } else {
            if (this.getById(data._id)) {
                throw `Duplicated id '${data._id}'`;
            }
        }

        this._data.push(data);
        this.save();

        return data;
    }
    public name(): string {
        return this._name;
    }
    public save(): any {
        return fs.writeFileSync(this._path, JSON.stringify(this._data, null, this._padding));
    }
    public search(query: string): any {
        return jsonpath({ path: query, json: this._data });
    }
    public update(data: { [name: string]: any }): any {
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
    public truncate(): void {
        this._data = [];
        this.save();

        this._sequence.truncate();
    }
    public where(query: any): any[] {
        let out: any[] = [];

        let firstTime = true;
        for (let key in query) {
            const partial = jsonpath({ path: `$..[?(@.${key}=='${query[key]}')]`, json: this._data });

            if (firstTime) {
                out = partial;
            } else {
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
    protected load(): void {
        this._path = SillyTable.buildTableName(this._name, this._paths.tables);

        if (fs.existsSync(this._path)) {
            const raw = fs.readFileSync(this._path);
            this._data = JSON.parse(`${raw}`);
        } else {
            this.save();
        }

        this._sequence = this._connection.sequence(this._name);
    }
    //
    // Public class methods.
    public static exists(name: string, directory: string): boolean {
        return fs.existsSync(SillyTable.buildTableName(name, directory));
    }
    //
    // Protected class methods.
    protected static buildTableName(name: string, directory: string): string {
        return path.join(directory, `${name}.tab`);
    }
}