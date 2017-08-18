import { SillyConnection } from '../connection.silly';

import { MongooseTableAdapter } from './mongoose-table.adapter';

export class MongooseConnectionAdapter {
    protected _connection: SillyConnection;
    protected _tables: { [name: string]: MongooseTableAdapter } = {};

    constructor(conn: SillyConnection) {
        this._connection = conn;
    }

    public on(type: string, callback: any): any {
    }

    public $table(name: string): any {
        if (typeof this._tables[name] === 'undefined') {
            this._tables[name] = new MongooseTableAdapter(this._connection.table(name), this);
        }

        return this._tables[name];
    }
}