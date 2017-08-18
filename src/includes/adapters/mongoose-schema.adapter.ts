export class MongooseSchemaAdapter {
    protected _specs: { [name: string]: any };

    constructor(specs: { [name: string]: any }) {
        this._specs = specs;
    }
}