import { SillySequence } from './sequence.silly';
import { SillyTable } from './table.silly';
export declare class SillyConnection {
    protected _compressed: boolean;
    protected _isConnected: boolean;
    protected _lastError: string;
    protected _manifest: {
        [name: string]: any;
    };
    protected _padding: number;
    protected _paths: {
        indexes: string;
        manifest: string;
        root: string;
        sequences: string;
        tables: string;
    };
    protected _sequences: {
        [name: string]: SillySequence;
    };
    protected _tables: {
        [name: string]: SillyTable;
    };
    constructor(dbpath: string, options?: any);
    compressed(): boolean;
    connected(): boolean;
    path(): string;
    paths(): {
        [name: string]: string;
    };
    sequence(name: string): SillySequence;
    table(name: string): SillyTable;
    tableExists(name: string): boolean;
    protected createManifest(): void;
    protected load(): void;
    protected loadOptions(options?: any): void;
    protected loadManifest(): void;
}
