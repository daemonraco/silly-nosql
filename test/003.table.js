'use strict'

const assert = require('chai').assert;
const path = require('path');

const snsql = require('..');
const dbPath = path.join(__dirname, '.tmpdb');
const db = snsql.manager.connect(dbPath);

const testObject = {
    name: 'John Doe',
    age: 20,
    address: {
        city: 'Some City',
        address: 'Some street 49'
    }
};

const testTable_name = 'test_table';
const testTable_exists = db.tableExists(testTable_name);

const emptyTable_name = 'empty_table';
const emptyTable = db.table(emptyTable_name);
const emptyTable_sequence = db.sequence(emptyTable_name);
const emptyTable_results = emptyTable.all();

const insertTable_name = 'insert_table';
const insertTable = db.table(insertTable_name);
const insertTable_result = insertTable.insert(JSON.parse(JSON.stringify(testObject)));
const insertTable_list = insertTable.all();
const insertTable_get = insertTable.getById(1);

const updateTable_name = 'update_table';
const updateTable = db.table(updateTable_name);
updateTable.insert(JSON.parse(JSON.stringify(testObject)));
let updateTable_get = updateTable.getById(1);
updateTable_get.age = 22;
const updateTable_result = updateTable.update(updateTable_get);
updateTable_get = updateTable.getById(1);

describe('silly-nosql: Tables: ', () => {
    const checkObject = ({ result, id, age }) => {
        assert.exists(result);
        assert.isObject(result);

        assert.hasAllKeys(result, ['_id', 'name', 'age', 'address']);
        assert.hasAllKeys(result.address, ['city', 'address']);

        assert.equal(result._id, id);
        assert.equal(result.name, 'John Doe');
        assert.equal(result.age, age);
        assert.equal(result.address.city, 'Some City');
        assert.equal(result.address.address, 'Some street 49');
    };

    describe('Database', () => {
        it(`doesn't have a table called '${testTable_name}'`, () => assert.equal(testTable_exists, false));
    });

    describe('A table', () => {
        it(`can be obtained when it's asked`, () => assert.exists(emptyTable));
        it(`is of type 'SillyTable'`, () => assert.equal(emptyTable.constructor.name, 'SillyTable'));

        it(`has a sequence with its name`, () => assert.exists(emptyTable_sequence));
        it(`has a sequnce of type 'SillySequence'`, () => assert.equal(emptyTable_sequence.constructor.name, 'SillySequence'));

        it(`starts as a empty list`, () => {
            assert.isArray(emptyTable_results);
            assert.equal(emptyTable_results.length, 0);
        });

        // ---

        it(`allows insertions`, () => checkObject({ result: insertTable_result, id: 1, age: 20 }));

        it(`is a list with one element ant its the right one`, () => {
            assert.exists(insertTable_list);
            checkObject({ result: insertTable_list[0], id: 1, age: 20 });
        });

        it(`returns the right element when it's requested by id`, () => checkObject({ result: insertTable_get, id: 1, age: 20 }));

        // ---

        console.log('updateTable_get', updateTable_get);
        it(`allows updates`, () => checkObject({ result: updateTable_get, id: 1, age: 22 }));
    });
});
