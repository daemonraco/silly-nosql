import { SillyTable } from '../table.silly';
export declare class ExpressAdapter {
    protected _table: SillyTable;
    protected _options: {
        [name: string]: any;
    };
    constructor();
    delete(req: any, res: any): void;
    get(req: any, res: any): void;
    insert(req: any, res: any): void;
    list(req: any, res: any): void;
    update(req: any, res: any): void;
    where(req: any, res: any): void;
    static adapat(app: any, table: SillyTable, options?: {
        [name: string]: any;
    }): void;
    protected static expandOptions(options: {
        [name: string]: any;
    }): {
        [name: string]: any;
    };
}
