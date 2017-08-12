import { SillyNoSQL } from './includes/manager.silly';
import { SillyConnection } from './includes/connection.silly';
import { SillyTable } from './includes/table.silly';
declare const _default: {
    manager: SillyNoSQL;
    types: {
        SillyConnection: typeof SillyConnection;
        SillyTable: typeof SillyTable;
    };
};
export = _default;
