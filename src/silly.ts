import { SillyNoSQL } from './includes/manager.silly';
import { SillyConnection } from './includes/connection.silly';
import { SillyTable } from './includes/table.silly';
import { SillySequence } from './includes/sequence.silly';

import { ExpressAdapter } from './includes/adapters/express.adapter';

export = {
    manager: SillyNoSQL.instance(),
    types: {
        SillyNoSQL,
        SillyConnection,
        SillyTable,
        SillySequence
    },
    adapters: {
        ExpressAdapter
    }
};
