'use strict';

// ---------------------------------------------------------------------------- //
// Dependences.
const snsql = require('..');

const assert = require('chai').assert;

// ---------------------------------------------------------------------------- //
// Data pointers.
let mongoose;
let Schema;
let ExamplesSchema
let model;

// ---------------------------------------------------------------------------- //
// Testing.
let testExeption = false;
const test = () => {
    describe('silly-nosql: Mongoose Adapter: ', () => {
        it('A mongoose object is created', () => assert.exists(mongoose));
        it('The mongoose object has a connection', () => assert.exists(mongoose.connection));
        it('The mongoose object has schema constructor', () => assert.exists(mongoose.Schema));

        it('A mongoose model can be created from a schema', () => assert.exists(model));
    });
};

// ---------------------------------------------------------------------------- //
// Collecting data.
try {
    //
    // Connection @{
    mongoose = snsql.shorts.mongoose();
    //const mongoose = require('mongoose');
    mongoose.connect(`mongodb://localhost/tempdb`, {
        useMongoClient: true
    });
    mongoose.connection.on('error', (err) => {
        console.log(err.name + ': ' + err.message);
    });
    // @}
    //
    // Schema @{
    Schema = mongoose.Schema;
    ExamplesSchema = new Schema({
        name: {
            type: String,
            required: 'Item name'
        },
        description: {
            type: String,
            default: ''
        },
        created_date: {
            type: Date,
            default: Date.now
        }
    });

    model = mongoose.model('examples', ExamplesSchema);
    // @}

    testExeption = true;
    test();
} catch (e) {
    console.error(`Exception: ${e.message}`);

    if (!testExeption) {
        test();
    }
}