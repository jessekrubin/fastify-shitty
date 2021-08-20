# fastify-shitty

Fastify plugin to help solve this issue: [fastify/fastify#2955](https://github.com/fastify/fastify/issues/2955)

Fastify is excellent; to make fastify less excellent, fastify-shitty throws errors randomly and/or delays sending responses.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  

Supports Fastify versions `3.x`

## Install
```
npm i @jsse/fastify-shitty
```

## Usage
Require `@jsse/fastify-shitty` and register.
```js
const fastify = require('fastify')()

fastify.register(require('@jsse/fastify-shitty'), {
  // put your options here
  odds: 0.5, // odds of throwing error; default is `0.2`
  delay: false // delay responses (t/f); default is `true`
})

fastify.listen(3000)
```

## Acknowledgements

 - fastify, for being excellent

 - mom & dad

## License

Licensed under [MIT](./LICENSE).<br/>
