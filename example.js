const fastify = require('fastify')({ logger: true })
fastify.register(require('.'))

fastify.get('/', {}, (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
  }
})
