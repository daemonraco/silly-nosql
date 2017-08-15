import { SillyConnection } from './connection.silly';
export declare class SillyNoSQL {
    private static _instance;
    protected connections: {
        [name: string]: SillyConnection;
    };
    protected constructor();
    connect(dbpath: string, options?: any): SillyConnection;
    static instance(): SillyNoSQL;
}
