"use strict";
const manager_silly_1 = require("./includes/manager.silly");
const connection_silly_1 = require("./includes/connection.silly");
const table_silly_1 = require("./includes/table.silly");
const express_adapter_1 = require("./includes/adapters/express.adapter");
module.exports = {
    manager: manager_silly_1.SillyNoSQL.instance(),
    types: { SillyNoSQL: manager_silly_1.SillyNoSQL, SillyConnection: connection_silly_1.SillyConnection, SillyTable: table_silly_1.SillyTable },
    adapters: { ExpressAdapter: express_adapter_1.ExpressAdapter }
};
