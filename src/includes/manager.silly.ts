import { SillyConnection } from './connection.silly';

export class SillyNoSQL {
    //
    // Class private properties.
    private static _instance: SillyNoSQL;
    //
    // Protected properties.
    protected connections: { [name: string]: SillyConnection } = {};
    //
    // Constructor.
    protected constructor() {
    }
    //
    // Public methods.
    public connect(dbpath: string, options: any = {}) {
        if (!this.connections[dbpath]) {
            this.connections[dbpath] = new SillyConnection(dbpath, options);
        }

        return this.connections[dbpath];
    }
    //
    // Public class methods.
    public static instance(): SillyNoSQL {
        if (!this._instance) {
            this._instance = new SillyNoSQL();
        }

        return this._instance;
    }
}
