import * as fs from 'fs';
import * as path from 'path';

import { SillySequence } from './sequence.silly';
import { SillyTable } from './table.silly';

export class SillyConnection {
    //
    // Protected properties.
    protected _compressed: boolean = true;
    protected _isConnected: boolean = false;
    protected _lastError: string = '';
    protected _manifest: { [name: string]: any } = {};
    protected _padding: number = 0;
    protected _paths = {
        indexes: '',
        manifest: '',
        root: '',
        sequences: '',
        tables: ''
    };
    protected _sequences: { [name: string]: SillySequence } = {};
    protected _tables: { [name: string]: SillyTable } = {};
    //
    // Constructor.
    constructor(dbpath: string, options: any = {}) {
        this._paths.root = dbpath;

        let stats;
        let statsRunning = true;
        try {
            stats = fs.lstatSync(this._paths.root);
            statsRunning = false;

            if (stats.isDirectory()) {
                this.loadOptions(options);
                this.load();
            }
        } catch (e) {
            if (!statsRunning) {
                throw e;
            } else {
                this._lastError = e.message;
            }
        }
    }
    //
    // Public methods.
    public compressed(): boolean {
        return this._compressed;
    }
    public connected(): boolean {
        return this._isConnected;
    }
    public path(): string {
        return this._paths.root;
    }
    public paths(): { [name: string]: string } {
        return this._paths;
    }
    public sequence(name: string): SillySequence {
        if (!this._sequences[name]) {
            this._sequences[name] = new SillySequence(name, this);
        }

        return this._sequences[name];
    }
    public table(name: string): SillyTable {
        if (!this._tables[name]) {
            this._tables[name] = new SillyTable(name, this);
        }

        return this._tables[name];
    }
    public tableExists(name: string): boolean {
        return SillyTable.exists(name, this._paths.tables);
    }
    //
    // Protected methods.
    protected createManifest(): void {
        const data = {
            tables: '_t',
            indexes: '_i',
            sequences: '_s',
            compressed: this._compressed
        };

        fs.writeFileSync(this._paths.manifest, JSON.stringify(data, null, this._padding));
    }
    protected load(): void {
        this.loadManifest();
        this._isConnected = true;
    }
    protected loadOptions(options: any = {}): void {
        if (typeof options !== 'object' || Array.isArray(options)) {
            options = {};
        }

        if (typeof options.compressed === 'boolean') {
            this._compressed = options.compressed;
        }

        this._padding = this.compressed() ? 0 : 2;
    }
    protected loadManifest(): void {
        this._paths.manifest = path.join(this._paths.root, 'manifest.json');

        if (!fs.existsSync(this._paths.manifest)) {
            this.createManifest();
        }

        this._manifest = require(this._paths.manifest);

        this._paths.tables = path.join(this._paths.root, this._manifest.tables);
        this._paths.indexes = path.join(this._paths.root, this._manifest.indexes);
        this._paths.sequences = path.join(this._paths.root, this._manifest.sequences);

        [this._paths.tables, this._paths.indexes, this._paths.sequences].forEach(path => {
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            } else {
                const stat = fs.statSync(path);
                if (!stat.isDirectory()) {
                    throw `Path '${path}' is not a directory.`;
                }
            }
        });
    }
}