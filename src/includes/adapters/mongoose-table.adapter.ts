import { SillyTable } from '../table.silly';

import { MongooseConnectionAdapter } from './mongoose-connection.adapter';

export class MongooseTableAdapter {
    protected _connection: MongooseConnectionAdapter;
    protected _table: SillyTable;

    constructor(table: SillyTable, connection: MongooseConnectionAdapter) {
        this._connection = connection;
        this._table = table;
    }
}