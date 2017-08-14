'use strict'

const assert = require('chai').assert;
const path = require('path');

describe('silly-nosql: Connect', () => {
    const snsql = require('..');
    const dbPath = path.join(__dirname, '.tmpdb');
    const db = snsql.manager.connect(dbPath);

    it('retruns a SillyConnection', () => assert.instanceOf(db, snsql.types.SillyConnection));

    it('retruns a connected database', () => {
        assert.typeOf(db.connected, 'function');
        assert.equal(db.connected(), true);
    });

    it('retruns a compressed database', () => {
        assert.typeOf(db.compressed, 'function');
        assert.equal(db.compressed(), true);
    });

    it('retruns a database with the right path', () => {
        assert.typeOf(db.path, 'function');
        assert.equal(db.path(), dbPath);
    });

    it('retruns a database with correct internal configuration paths', () => {
        const paths = db.paths();

        assert.isObject(paths);

        assert.typeOf(paths.root, 'string');
        assert.typeOf(paths.indexes, 'string');
        assert.typeOf(paths.manifest, 'string');
        assert.typeOf(paths.sequences, 'string');
        assert.typeOf(paths.tables, 'string');

        assert.equal(paths.root, dbPath);
        assert.equal(paths.indexes, path.join(dbPath, '_i'));
        assert.equal(paths.manifest, path.join(dbPath, 'manifest.json'));
        assert.equal(paths.sequences, path.join(dbPath, '_s'));
        assert.equal(paths.tables, path.join(dbPath, '_t'));
    });
});
