import { SillyConnection } from '../connection.silly';
import { MongooseTableAdapter } from './mongoose-table.adapter';
export declare class MongooseConnectionAdapter {
    protected _connection: SillyConnection;
    protected _tables: {
        [name: string]: MongooseTableAdapter;
    };
    constructor(conn: SillyConnection);
    on(type: string, callback: any): any;
    $table(name: string): any;
}
