# Objects and Methods
## `SillyConnection`
* `SillyConnection(dbpath, [options])`: Class constructor.
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
* `sequence`: Gives you access to certain sequence.
    * `name` (_string_): Name of the sequence to get.
    * Returns a _SillySequence_ instance.
* `table`: Gives you access to certain table.
    * `name` (_string_): Name of the table to get.
    * Returns a _SillyTable_ instance.

* `tableExists`: Let's you know if certain table exists.
    * `name` (_string_): Name of the table to check.
    * Returns `true` when it does.

