'use strict'

const fp = require('fastify-plugin')

const defaultOpts = {
  odds: 0.2,
  delay: true
}

module.exports = fp(async function (fastify, opts) {
  const options = { ...defaultOpts, ...opts }
  const { odds, delay } = options
  fastify.addHook('onRequest', (request, reply, done) => {
    const rand = Math.random()
    const err = rand > odds ? null : new Error('Houston we have a problem...')
    if (delay === true) {
      setTimeout(
        () => done(err),
        Math.floor(rand * 1000)
      )
    } else {
      done(err)
    }
  })

  fastify.decorate('exampleDecorator', () => {
    return 'decorated'
  })
}, { fastify: '3.x' })
