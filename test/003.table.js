'use strict';

// ---------------------------------------------------------------------------- //
// Dependences.
const snsql = require('..');

const assert = require('chai').assert;
const path = require('path');

const dbPath = path.join(__dirname, '.tmpdb');
const db = snsql.manager.connect(dbPath);

// ---------------------------------------------------------------------------- //
// Data pointers
const testObject = {
    name: 'John Doe',
    age: 20,
    address: {
        city: 'Some City',
        address: 'Some street 49'
    }
};

let testTable_name;
let testTable_exists;

let emptyTable_name;
let emptyTable;
let emptyTable_sequence;
let emptyTable_results;

let insertTable_name;
let insertTable;
let insertTable_result;
let insertTable_list;
let insertTable_get;

let updateTable_name;
let updateTable;
let updateTable_get;
let updateTable_result;

let updateWhereTable_name;
let updateWhereTable;
let updateWhereTable_result;
let updateWhereTable_get;

let updateSearchTable_name;
let updateSearchTable;
let updateSearchTable_result;
let updateSearchTable_get;

// ---------------------------------------------------------------------------- //
// Testing.
let testExeption = false;
const test = () => {
    describe('silly-nosql: Tables:', () => {
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

        it(`The database doesn't have a table called '${testTable_name}' if it wasn't created.`, () => assert.equal(testTable_exists, false));

        // ---

        it(`A table can be obtained when it's asked`, () => assert.exists(emptyTable));
        it(`A table is of type 'SillyTable'`, () => assert.equal(emptyTable.constructor.name, 'SillyTable'));

        it(`A table has a sequence with its name`, () => assert.exists(emptyTable_sequence));
        it(`A table has a sequnce of type 'SillySequence'`, () => assert.equal(emptyTable_sequence.constructor.name, 'SillySequence'));

        it(`A table starts as a empty list`, () => {
            assert.isArray(emptyTable_results);
            assert.equal(emptyTable_results.length, 0);
        });

        // ---

        it(`A table allows insertions`, () => checkObject({ result: insertTable_result, id: 1, age: 20 }));

        it(`A table is a list with one element ant its the right one`, () => {
            assert.exists(insertTable_list);
            checkObject({ result: insertTable_list[0], id: 1, age: 20 });
        });

        it(`A table returns the right element when it's requested by id`, () => checkObject({ result: insertTable_get, id: 1, age: 20 }));

        // ---

        it(`A table allows updates`, () => checkObject({ result: updateTable_get, id: 1, age: 22 }));

        // ---

        it(`A table allows partial updates using search conditions`, () => {
            assert.equal(updateSearchTable_result.length, 1);
            checkObject({
                result: updateSearchTable_result.length ? updateSearchTable_result[0] : null,
                id: 1,
                age: 22
            });
            checkObject({ result: updateSearchTable_get, id: 1, age: 22 });
        });

        // ---

        it(`A table allows partial updates using where conditions`, () => {
            assert.equal(updateWhereTable_result.length, 1);
            checkObject({
                result: updateWhereTable_result.length ? updateWhereTable_result[0] : null,
                id: 1,
                age: 22
            });
            checkObject({ result: updateWhereTable_get, id: 1, age: 22 });
        });
    });
};

// ---------------------------------------------------------------------------- //
// Collecting data.
try {
    testTable_name = 'test_table';
    testTable_exists = db.tableExists(testTable_name);

    emptyTable_name = 'empty_table';
    emptyTable = db.table(emptyTable_name);
    emptyTable_sequence = db.sequence(emptyTable_name);
    emptyTable_results = emptyTable.all();

    insertTable_name = 'insert_table';
    insertTable = db.table(insertTable_name);
    insertTable_result = insertTable.insert(JSON.parse(JSON.stringify(testObject)));
    insertTable_list = insertTable.all();
    insertTable_get = insertTable.getById(1);

    updateTable_name = 'update_table';
    updateTable = db.table(updateTable_name);
    updateTable.insert(JSON.parse(JSON.stringify(testObject)));
    updateTable_get = updateTable.getById(1);
    updateTable_get.age = 22;
    updateTable_result = updateTable.update(updateTable_get);
    updateTable_get = updateTable.getById(1);

    updateSearchTable_name = 'update_search_table';
    updateSearchTable = db.table(updateSearchTable_name);
    updateSearchTable.insert(JSON.parse(JSON.stringify(testObject)));
    updateSearchTable_result = updateSearchTable.searchAndUpdate(`$..[?(@._id=='1')]`, { age: 22 });
    updateSearchTable_get = updateSearchTable.getById(1);

    updateWhereTable_name = 'update_where_table';
    updateWhereTable = db.table(updateWhereTable_name);
    updateWhereTable.insert(JSON.parse(JSON.stringify(testObject)));
    updateWhereTable_result = updateWhereTable.updateWhere({ _id: 1 }, { age: 22 });
    updateWhereTable_get = updateWhereTable.getById(1);

    testExeption = true;
    test();
} catch (e) {
    console.error(`Exception: ${e.message}`);

    if (!testExeption) {
        test();
    }
}