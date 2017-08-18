import { SillyNoSQL } from './includes/manager.silly';
import { SillyConnection } from './includes/connection.silly';
import { SillyTable } from './includes/table.silly';
import { SillySequence } from './includes/sequence.silly';

import { ExpressAdapter } from './includes/adapters/express.adapter';
import { MongooseAdapter } from './includes/adapters/mongoose.adapter';

export = {
    manager: SillyNoSQL.instance(),
    types: {
        SillyNoSQL,
        SillyConnection,
        SillyTable,
        SillySequence
    },
    adapters: {
        ExpressAdapter,
        MongooseAdapter
    },
    shorts: {
        mongoose: () => {
            return new MongooseAdapter();
        },
        tableToExpress: (app: any, table: SillyTable, options: { [name: string]: any } = {}) => {
            ExpressAdapter.adapat(app, table, options);
        }
    }
};
