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
    all(): any[];
    delete(id: number): boolean;
    drop(): boolean;
    getById(id: number): any;
    insert(data: {
        [name: string]: any;
    }): any;
    name(): string;
    save(): void;
    search(query: string): any;
    searchAndUpdate(query: string, data: {
        [name: string]: any;
    }): any;
    update(data: {
        [name: string]: any;
    }): any;
    updateWhere(query: {
        [name: string]: any;
    }, data: {
        [name: string]: any;
    }): any;
    truncate(): void;
    where(query: {
        [name: string]: any;
    }): any[];
    protected load(): void;
    static exists(name: string, directory: string): boolean;
    protected static buildTableName(name: string, directory: string): string;
}
