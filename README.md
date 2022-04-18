# uuid-ossp extension for pg-mem


## Installation

Using npm:
```bash
$ {sudo -H} npm i -g npm
$ npm i --save pg-mem-uuid-ossp
```

## Usage

In Node.js:
```js
var { newDb } = require('pg-mem');
var { uuidOssp } = require('pg-mem-uuid-ossp');
```

With typescript:
 ```typescript
import { newDb } from 'pg-mem';
import { uuidOssp } from 'pg-mem-uuid-ossp';
```

Then use it:
```js
const db = newDb();
db.registerExtension('uuid-ossp', uuidOssp);
...
db.public.many(`
  create extension "uuid-ossp";
  select uuid_generate_v4();
`);
```

## Functions defined

This extension intends to emulate the PostgreSQL `uuid-ossp` extension, so it defines the following functions:

### Functions for UUID Generation
- uuid_generate_v1() -> uuid
- uuid_generate_v1mc() -> uuid (synonym for uuid_generate_v1)
- uuid_generate_v3(namespace uuid, name text) -> uuid
- uuid_generate_v4() ->
- uuid_generate_v5(namespace uuid, name text) -> uuid

### Functions returning UUID Constants
The [RFC4122](https://www.rfc-editor.org/rfc/rfc4122.html#appendix-C) defines
4 UUID namespaces that PostgreSQL uuid-ossp extension returns in the following 4 functions: 
- uuid_ns_dns() -> uuid
- uuid_ns_url() -> uuid
- uuid_ns_oid() -> uuid
- uuid_ns_x500() -> uuid

That RFC also defines a Nil UUID:
- uuid_nil() -> uuid

