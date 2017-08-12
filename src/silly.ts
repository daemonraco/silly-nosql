import { SillyNoSQL } from './includes/manager.silly';
import { SillyConnection } from './includes/connection.silly';
import { SillyTable } from './includes/table.silly';

export = {
    manager: SillyNoSQL.instance(),
    types: { SillyConnection, SillyTable }
};
