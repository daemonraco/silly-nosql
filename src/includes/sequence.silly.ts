import * as fs from 'fs';
import * as path from 'path';

import { SillyConnection } from './connection.silly';

export class SillySequence {
    //
    // Protected properties.
    protected _connection: SillyConnection;
    protected _name: string;
    protected _path: string;
    protected _paths: { [name: string]: string };
    protected _value: number = 0;
    //
    // Constructor.
    constructor(name: string, connection: SillyConnection) {
        this._name = name;
        this._connection = connection;

        this._paths = this._connection.paths();

        this.load();
    }
    //
    // Public methods.
    public next(): number {
        this._value++;
        this.save();

        return this._value;
    }
    public truncate(): void {
        this._value = 0;
        this.save();
    }
    //
    // Protected methods.
    protected load(): void {
        this._path = path.join(this._paths.sequences, `${this._name}.seq`);

        if (fs.existsSync(this._path)) {
            const raw = fs.readFileSync(this._path);
            this._value = parseInt(`${raw}`);
        } else {
            this._value = 0;
            this.save();
        }
    }
    public save(): any {
        return fs.writeFileSync(this._path, this._value);
    }
}