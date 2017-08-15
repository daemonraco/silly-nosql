import { SillyNoSQL } from './includes/manager.silly';
import { SillyConnection } from './includes/connection.silly';
import { SillyTable } from './includes/table.silly';
import { SillySequence } from './includes/sequence.silly';
import { ExpressAdapter } from './includes/adapters/express.adapter';
declare const _default: {
    manager: SillyNoSQL;
    types: {
        SillyNoSQL: typeof SillyNoSQL;
        SillyConnection: typeof SillyConnection;
        SillyTable: typeof SillyTable;
        SillySequence: typeof SillySequence;
    };
    adapters: {
        ExpressAdapter: typeof ExpressAdapter;
    };
};
export = _default;
