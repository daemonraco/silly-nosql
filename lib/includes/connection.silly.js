"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const sequence_silly_1 = require("./sequence.silly");
const table_silly_1 = require("./table.silly");
class SillyConnection {
    //
    // Constructor.
    constructor(dbpath, options = {}) {
        //
        // Protected properties.
        this._compressed = true;
        this._isConnected = false;
        this._lastError = '';
        this._manifest = {};
        this._padding = 0;
        this._paths = {
            indexes: '',
            manifest: '',
            root: '',
            sequences: '',
            tables: ''
        };
        this._sequences = {};
        this._tables = {};
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
        }
        catch (e) {
            if (!statsRunning) {
                throw e;
            }
            else {
                this._lastError = e.message;
            }
        }
    }
    //
    // Public methods.
    compressed() {
        return this._compressed;
    }
    connected() {
        return this._isConnected;
    }
    path() {
        return this._paths.root;
    }
    paths() {
        return this._paths;
    }
    sequence(name) {
        if (!this._sequences[name]) {
            this._sequences[name] = new sequence_silly_1.SillySequence(name, this);
        }
        return this._sequences[name];
    }
    table(name) {
        if (!this._tables[name]) {
            this._tables[name] = new table_silly_1.SillyTable(name, this);
        }
        return this._tables[name];
    }
    tableExists(name) {
        return table_silly_1.SillyTable.exists(name, this._paths.tables);
    }
    //
    // Protected methods.
    createManifest() {
        const data = {
            tables: '_t',
            indexes: '_i',
            sequences: '_s',
            compressed: this._compressed
        };
        fs.writeFileSync(this._paths.manifest, JSON.stringify(data, null, this._padding));
    }
    load() {
        this.loadManifest();
        this._isConnected = true;
    }
    loadOptions(options = {}) {
        if (typeof options !== 'object' || Array.isArray(options)) {
            options = {};
        }
        if (typeof options.compressed === 'boolean') {
            this._compressed = options.compressed;
        }
        this._padding = this.compressed() ? 0 : 2;
    }
    loadManifest() {
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
            }
            else {
                const stat = fs.statSync(path);
                if (!stat.isDirectory()) {
                    throw `Path '${path}' is not a directory.`;
                }
            }
        });
    }
}
exports.SillyConnection = SillyConnection;
