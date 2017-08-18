import { SillyTable } from '../table.silly';
import { MongooseConnectionAdapter } from './mongoose-connection.adapter';
export declare class MongooseTableAdapter {
    protected _connection: MongooseConnectionAdapter;
    protected _table: SillyTable;
    constructor(table: SillyTable, connection: MongooseConnectionAdapter);
}
