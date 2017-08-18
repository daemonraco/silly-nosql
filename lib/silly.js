"use strict";
const manager_silly_1 = require("./includes/manager.silly");
const connection_silly_1 = require("./includes/connection.silly");
const table_silly_1 = require("./includes/table.silly");
const sequence_silly_1 = require("./includes/sequence.silly");
const express_adapter_1 = require("./includes/adapters/express.adapter");
const mongoose_adapter_1 = require("./includes/adapters/mongoose.adapter");
module.exports = {
    manager: manager_silly_1.SillyNoSQL.instance(),
    types: {
        SillyNoSQL: manager_silly_1.SillyNoSQL,
        SillyConnection: connection_silly_1.SillyConnection,
        SillyTable: table_silly_1.SillyTable,
        SillySequence: sequence_silly_1.SillySequence
    },
    adapters: {
        ExpressAdapter: express_adapter_1.ExpressAdapter,
        MongooseAdapter: mongoose_adapter_1.MongooseAdapter
    },
    shorts: {
        mongoose: () => {
            return new mongoose_adapter_1.MongooseAdapter();
        },
        tableToExpress: (app, table, options = {}) => {
            express_adapter_1.ExpressAdapter.adapat(app, table, options);
        }
    }
};
