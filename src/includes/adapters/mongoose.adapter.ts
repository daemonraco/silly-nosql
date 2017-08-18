import { SillyNoSQL } from '../manager.silly';

import { MongooseConnectionAdapter } from './mongoose-connection.adapter';
import { MongooseSchemaAdapter } from './mongoose-schema.adapter';
import { MongooseTableAdapter } from './mongoose-table.adapter';

export class MongooseAdapter_KnownSchemas {
    schema: MongooseSchemaAdapter;
    table: MongooseTableAdapter;

    constructor(schema: MongooseSchemaAdapter, table: MongooseTableAdapter) {
        this.schema = schema;
        this.table = table;
    }
}

export class MongooseAdapter {
    protected _knownSchemas: { [name: string]: MongooseAdapter_KnownSchemas } = {};

    public connection: MongooseConnectionAdapter;
    public Schema = MongooseSchemaAdapter;

    public connect(dsn: string, options: { [name: string]: any }): any {
        const dsnPattern = /mongodb:\/\/localhost((:[0-9]+)?)\/(.*)/;
        const path = dsn.match(dsnPattern) ? dsn.replace(dsnPattern, '$3') : `./${dsn}`;

        this.connection = new MongooseConnectionAdapter(SillyNoSQL.instance().connect(path));

        return this.connection;
    }
    public model(name: string, schema: MongooseSchemaAdapter | null = null): any {
        let out;

        if (schema) {
            if (typeof this._knownSchemas[name] !== 'undefined') {
                throw `Schema '${name}' is already initialized.`;
            }

            const table = this.connection.$table(name);
            this._knownSchemas[name] = new MongooseAdapter_KnownSchemas(schema, table);

            out = this._knownSchemas[name].table;
        } else {
            if (typeof this._knownSchemas[name] === 'undefined') {
                throw `Schema '${name}' is not initialized.`;
            }
        }

        return out;
    }
}