import { SillyTable } from '../table.silly';

export class ExpressAdapter {
    protected _table: SillyTable;
    protected _options: { [name: string]: any } = {};

    constructor() {
    }

    public delete(req: any, res: any): void {
        let result: any = {};
        try {
            result.result = this._table.delete(req.params.id);
        } catch (e) {
            result.error = e.message;
        }

        res.json(result);
    }
    public get(req: any, res: any): void {
        let result: any = {};
        try {
            result = this._table.getById(req.params.id);
        } catch (e) {
            result.error = e.message;
        }

        res.json(result);
    }
    public insert(req: any, res: any): void {
        let result: any = {};
        try {
            result = this._table.insert(req.body);
        } catch (e) {
            result.error = e.message;
        }

        res.json(result);
    }
    public list(req: any, res: any): void {
        if (req.query.query) {
            this.where(req, res);
        } else {
            let result: any = {};
            try {
                result = this._table.all();
            } catch (e) {
                result.error = e.message;
            }

            res.json(result);
        }
    }
    public update(req: any, res: any): void {
        let result: any = {};
        try {
            result = this._table.update(req.body);
        } catch (e) {
            result.error = e.message;
        }

        res.json(result);
    }
    public where(req: any, res: any): void {
        let result: any = {};
        try {
            result = this._table.where(JSON.parse(req.query.query));
        } catch (e) {
            result.error = e.message;
        }

        res.json(result);
    }

    public static adapat(app: any, table: SillyTable, options: { [name: string]: any } = {}) {
        const adapter = new ExpressAdapter();

        adapter._table = table;
        adapter._options = ExpressAdapter.expandOptions(options);

        app.route(`${adapter._options.path}/${table.name()}`)
            .get((req: any, res: any) => adapter.list(req, res))
            .post((req: any, res: any) => adapter.insert(req, res));

        app.route(`${adapter._options.path}/${table.name()}/:id`)
            .get((req: any, res: any) => adapter.get(req, res))
            .put((req: any, res: any) => adapter.update(req, res))
            .patch((req: any, res: any) => adapter.update(req, res))
            .delete((req: any, res: any) => adapter.delete(req, res));
    }
    protected static expandOptions(options: { [name: string]: any }): { [name: string]: any } {
        if (!options.path) {
            options.path = '/rest/v1';
        }

        return options;
    }
}