/// <reference path="../../src/definitions/jsonpath-plus.d.ts" />
import { SillyConnection } from './connection.silly';
import { SillySequence } from './sequence.silly';
export declare class SillyTable {
    protected _connection: SillyConnection;
    protected _data: any[];
    protected _name: string;
    protected _padding: number;
    protected _path: string;
    protected _paths: {
        [name: string]: string;
    };
    protected _sequence: SillySequence;
    constructor(name: string, connection: SillyConnection);
    delete(id: number): boolean;
    getById(id: number): any;
    insert(data: {
        [name: string]: any;
    }): boolean;
    save(): any;
    search(query: string): any;
    update(data: {
        [name: string]: any;
    }): boolean;
    truncate(): void;
    protected load(): void;
}
