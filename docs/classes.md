# Objects and Methods (silly-nosql@0.0.6)

## Class `ExpressAdapter`
* `adapat(app, table[, options])`<sup>class method</sup>: RESTful adapter for ExpressJS
    * `app` (_express_): ExpressJS application obtained using `express()`.
    * `table` (_SillyTable_): Table to expose.
    * `options` (_object_): List of options to use when exposing this table.
        * `path`<sup>required</sup> (_string_): URI where it going to be exposed. By default, it's assumed to be `/rest/v1`:

## Class `SillyConnection`
Database representation.
* `SillyConnection(dbpath[, options])`: Class constructor.
    * `dbpath` (_string_): Directory path where to store your data.
    * `options` (_object_): List of configuration parameters for the connections:
        * `compressed` (boolean): Configures internal JSON data to be store
        minified or human readable. By default it's `true`.
    * Returns a _SillyConnection_ instance.
* `compressed()`: Let's you knwon if data is being stored minified.
    * Returns a boolean.
* `connected()`: Let's you knwon if this is a valid and connected database
connection.
    * Returns a boolean.
* `path()`: Let's you knwon where your data is being stored.
    * Returns a string.
* `paths()`: Let's you knwon used internal paths.
    * Retuns a simple JavaScript object.
* `sequence(name)`: Gives you access to certain sequence.
    * `name` (_string_): Name of the sequence to get.
    * Returns a _SillySequence_ instance.
* `table(name)`: Gives you access to certain table.
    * `name` (_string_): Name of the table to get.
    * Returns a _SillyTable_ instance.

* `tableExists(name)`: Let's you know if certain table exists.
    * `name` (_string_): Name of the table to check.
    * Returns `true` when it does.

## Class `SillyNoSQL`
Main manager.
* `connect(dbpath[, options])`: Connections factory.
    * `dbpath` (_string_): Directory path where to store your data.
    * `options` (_object_): List of configuration parameters for the connections:
        * `compressed` (boolean): Configures internal JSON data to be store
        minified or human readable. By default it's `true`.
    * Returns a _SillyConnection_ instance.
* `instance()`<sup>class method</sup>
    * Returns the single _SillyNoSQL_ instance.

## Class `SillySequence`
* `SillySequence(name, connection)`: Class constructor.
    * `name` (_string_): Name of the sequence to represent.
    * `connection` (_SillyConnection_): Connection on whith it works.
    * Returns a _SillySequence_ instance.
* `drop()`: Destroys this sequence's file.
    * Returns `true` if the file doesn't exists at the end of the operation.
* `next()`: Jumps ahead this sequence by one and returns its last value.
    * Return a valid id.
* `truncate()`: Resets this sequence to zero.

## Class `SillyTable`
* `SillyTable(name, connection)`: Class constructor.
    * `name` (_string_): Name of the table to represent
    * `connection` (_SillyConnection_): Connection on whith it works.
* `all()`: Gets all entries on this table.
    * Returns an array of items.
* `delete(id)`: Destroys a specific entry.
    * `id` (_number_): ID to look for.
    * Returns `true` when it's found and deleted.
* `drop()`: Destroys this table's file.
    * Returns `true` if the file doesn't exists at the end of the operation.
* `getById(id)`: Gets a specific entry on this table. using its ID.
    * `id` (_number_): ID to look for.
    * Returns an item or `null` if it doesn't exist.
* `insert(data)`: Inserts a new entry.
    * `data` (_object_): JSON object to insert.
    * Returns the entry as it's left after the operation.
* `name()`: Name of the represented table.
    * Returns a _string_.
* `save()`: Forces current data status to be written on its file.
* `search(query)`: Searches items based on a pattern.
    * `query` (_string_): [JSONPath](https://www.npmjs.com/package/jsonpath-plus)
      pattern.
    * Returns an array of items.
* `update(data)`: Updates an existing entry.
    * `data` (_object_): JSON object to update. It must have a field called `_id`
    or it won't find what to update.
    * Returns the entry as it's left after the operation.
* `truncate()`: Resets this table to an empty list of items.
* `where(query: any)`: Searches using a simple object that's internally translated
  into JSONPath patterns.
    * `query` (_object_): JSON object to use as pattern.
    * Returns an array of items.
