import { SillyConnection } from './connection.silly';
export declare class SillySequence {
    protected _connection: SillyConnection;
    protected _name: string;
    protected _path: string;
    protected _paths: {
        [name: string]: string;
    };
    protected _value: number;
    constructor(name: string, connection: SillyConnection);
    drop(): any;
    next(): number;
    truncate(): void;
    protected load(): void;
    save(): any;
}
