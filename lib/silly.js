"use strict";
const manager_silly_1 = require("./includes/manager.silly");
const connection_silly_1 = require("./includes/connection.silly");
const table_silly_1 = require("./includes/table.silly");
module.exports = {
    manager: manager_silly_1.SillyNoSQL.instance(),
    types: { SillyConnection: connection_silly_1.SillyConnection, SillyTable: table_silly_1.SillyTable }
};
