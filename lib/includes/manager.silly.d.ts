import { SillyConnection } from './connection.silly';
export declare class SillyNoSQL {
    private static _instance;
    protected connections: {
        [name: string]: SillyConnection;
    };
    constructor();
    connect(dbpath: string, options?: any): SillyConnection;
    static instance(): SillyNoSQL;
}
