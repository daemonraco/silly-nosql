# Silly NoSQL (v0.0.5)
NoSQL database emulated with files. For small tests, not real stuff, of course, c'mon, don't be silly.

## Installation
To install this module on your _NodeJS_ project run this:
```sh
npm install silly-nosql --save
```

## How to use
First of all, you need to create a directory where to store your data, as an
example will conside a directory called `db` in the same direcory where you store
your script.

Then use a cose like this:
```js
'use strict';
//
// Importing requried library.
const path = require('path');
//
// Importing this library.
const snsql = require('silly-nosql');
//
// Getting the connections manager singleton.
const snsqlManager = snsql.manager;
//
// Getting a connection to our database (... the directory).
const myDB = snsqlManager.connect(path.join(__dirname, 'db'));
//
// Getting a table. If it doesn't exist, it will create it.
const myTable = myDB.table('my_table');
//
// Inserting an arbitrary object.
myTable.insert({
    name: 'John Doe',
    age: 20,
    address: {
        city: 'Some City',
        address: 'Some street 49'
    }
});
//
// Retrieving and prompting.
console.log('Results:', JSON.stringify(myTable.all()));
```

This should show you something like this:
```
Results: [{"name":"John Doe","age":20,"address:{"city:"Some City","address":"Some street 49"}}]
```

## Objects and Methods
Follow [this link](docs/classes.md) for some documentation.

## ExpressJS adapter
If you use _ExpressJS_ you can use this to expose your tables as a RESTful API:
```js
'use strict'
const path = require('path');
const express = require('express');
const snsql = require('silly-nosql');

const app = express();
const snsqlManager = snsql.manager;
const myDB = snsqlManager.connect(path.join(__dirname, 'db'));
const myTable = myDB.table('my_table');

// ... all your express setting

snsql.adapters.ExpressAdapter.adapat(app, myTable, {
    path: '/rest/v1'
});

// ... rest of your stuff
```

This will provide you with this endpoints:
* _GET_ `/rest/vi/my_table`
* _POST_ `/rest/vi/my_table`
* _GET_ `/rest/vi/my_table/:id`
* _PUT_ `/rest/vi/my_table/:id`
* _PATCH_ `/rest/vi/my_table/:id`
* _DELETE_ `/rest/vi/my_table/:id`

## Licence
MIT &copy; [Alejandro Dario Simi](http://daemonraco.com)
