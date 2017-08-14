"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressAdapter {
    constructor() {
        this._options = {};
    }
    delete(req, res) {
        let result = {};
        try {
            result.result = this._table.delete(req.params.id);
        }
        catch (e) {
            result.error = e.message;
        }
        res.json(result);
    }
    get(req, res) {
        let result = {};
        try {
            result = this._table.getById(req.params.id);
        }
        catch (e) {
            result.error = e.message;
        }
        res.json(result);
    }
    insert(req, res) {
        let result = {};
        try {
            result = this._table.insert(req.body);
        }
        catch (e) {
            result.error = e.message;
        }
        res.json(result);
    }
    list(req, res) {
        if (req.query.query) {
            this.where(req, res);
        }
        else {
            let result = {};
            try {
                result = this._table.all();
            }
            catch (e) {
                result.error = e.message;
            }
            res.json(result);
        }
    }
    update(req, res) {
        let result = {};
        try {
            result = this._table.update(req.body);
        }
        catch (e) {
            result.error = e.message;
        }
        res.json(result);
    }
    where(req, res) {
        let result = {};
        try {
            result = this._table.where(JSON.parse(req.query.query));
        }
        catch (e) {
            result.error = e.message;
        }
        res.json(result);
    }
    static adapat(app, table, options = {}) {
        const adapter = new ExpressAdapter();
        adapter._table = table;
        adapter._options = ExpressAdapter.expandOptions(options);
        app.route(`${adapter._options.path}/${table.name()}`)
            .get((req, res) => adapter.list(req, res))
            .post((req, res) => adapter.insert(req, res));
        app.route(`${adapter._options.path}/${table.name()}/:id`)
            .get((req, res) => adapter.get(req, res))
            .put((req, res) => adapter.update(req, res))
            .patch((req, res) => adapter.update(req, res))
            .delete((req, res) => adapter.delete(req, res));
    }
    static expandOptions(options) {
        if (!options.path) {
            options.path = '/rest/v1';
        }
        return options;
    }
}
exports.ExpressAdapter = ExpressAdapter;
