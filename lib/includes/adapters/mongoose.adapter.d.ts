import { MongooseConnectionAdapter } from './mongoose-connection.adapter';
import { MongooseSchemaAdapter } from './mongoose-schema.adapter';
import { MongooseTableAdapter } from './mongoose-table.adapter';
export declare class MongooseAdapter_KnownSchemas {
    schema: MongooseSchemaAdapter;
    table: MongooseTableAdapter;
    constructor(schema: MongooseSchemaAdapter, table: MongooseTableAdapter);
}
export declare class MongooseAdapter {
    protected _knownSchemas: {
        [name: string]: MongooseAdapter_KnownSchemas;
    };
    connection: MongooseConnectionAdapter;
    Schema: typeof MongooseSchemaAdapter;
    connect(dsn: string, options: {
        [name: string]: any;
    }): any;
    model(name: string, schema?: MongooseSchemaAdapter | null): any;
}
