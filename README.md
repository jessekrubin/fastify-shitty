# fastify-shitty

Fastify plugin to help solve this issue:
[fastify/fastify#2955](https://github.com/fastify/fastify/issues/2955)

Fastify is excellent; to make fastify less excellent, fastify-shitty throws
errors randomly and/or delays sending responses.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Supports Fastify versions `5.x`

## Install

```
npm i @jsse/fastify-shitty
```

## Usage

Require `@jsse/fastify-shitty` and register.

```js
import process from "node:process";
import Fastify from "fastify";
import FastifyShitty from "./dist/fastify-shitty.js";

const fastify = Fastify({ logger: true });
fastify.register(FastifyShitty, { odds: 0.3, delay: true });

fastify.get("/", {}, (request, reply) => {
  reply.send({ hello: "world" });
});

fastify.listen({ port: 3000, host: "0.0.0.0" }).catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
```

## Acknowledgements

- fastify, for being excellent

- mom & dad

## License

Licensed under [MIT](./LICENSE).<br/>
