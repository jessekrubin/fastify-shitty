const { test } = require('tap')

test('Should error!', async t => {
  t.plan(1)
  const app = require('fastify')()
  app.register(require('..'))
  app.get('/', {}, (request, reply) => {
    reply.send({ hello: 'world' })
  })
  await app.ready()

  const nreqs = 500
  let nerrors = 0
  const mkreq = async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/'
    })
    if (res.statusCode !== 200) {
      nerrors++
    }
  }
  await Promise.all(Array.from(Array(nreqs).keys()).map(mkreq))
  t.not(nerrors, 0, 'should have some errors')
})
