import {
  test, expect
} from 'vitest'
import Fastify from 'fastify'
import {
  FastifyShitty
} from './fastify-shitty.js'

test('fastify-shitty', async () => {
  const fastify = Fastify()
  await fastify.register(FastifyShitty)

  fastify.get('/', {}, (_request, reply) => {
    reply.send({ hello: 'world' })
  })
  await fastify.ready()

  const nreqs = 500
  let nerrors = 0
  const mkreq = async () => {
    const res = await fastify.inject({
      method: 'GET',
      url: '/'
    })
    if (res.statusCode !== 200) {
      nerrors++
    }
  }
  await Promise.all(Array.from(Array(nreqs).keys()).map(mkreq))
  expect(nerrors).toBeGreaterThan(0)
})
