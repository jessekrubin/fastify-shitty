import process from 'node:process'
import Fastify from 'fastify'
import FastifyShitty from './dist/fastify-shitty.js'

const fastify = Fastify({ logger: true })
fastify.register(FastifyShitty, { odds: 0.3, delay: true })

fastify.get('/', {}, (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen(
  { port: 3000, host: '0.0.0.0' }
).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
