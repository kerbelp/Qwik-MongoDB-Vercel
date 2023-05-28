# Qwik City With MongoDB and Vercel template

This is an effort to create a template of Qwik City with MongoDB and Vercel.

The project requires these evironment variables:

```
DB_CONN_STRING=<value>
DB_NAME=<value>
COLLECTION_NAME=<value>
```

Right now there is an issue when runnning `pnpm run build`:

output:

```
[commonjs] Cannot bundle Node.js built-in "stream" imported from "node_modules/.pnpm/mongodb@5.5.0/node_modules/mongodb/lib/cursor/abstract_cursor.js". Consider disabling ssr.noExternal or remove the built-in dependency.
```

