'use strict'

const assert = require('chai').assert;

describe('silly-nosql: Require', () => {
    const snsql = require('..');

    it('provides a manager', () => assert.isObject(snsql.manager));
    it(`provides a manager of type 'SillyNoSQL'`, () => assert.instanceOf(snsql.manager, snsql.types.SillyNoSQL));

    it('provides a list of types', () => assert.isObject(snsql.types));
    it(`provides type 'SillyNoSQL'`, () => assert.exists(snsql.types.SillyNoSQL));
    it(`provides type 'SillyConnection'`, () => assert.exists(snsql.types.SillyConnection));
    it(`provides type 'SillyTable'`, () => assert.exists(snsql.types.SillyTable));

    it('provides a list of adapters', () => assert.isObject(snsql.adapters));
    it(`provides a 'ExpressJS' adapter`, () => assert.exists(snsql.adapters.ExpressAdapter));
});
