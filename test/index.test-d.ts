/* eslint no-void: ["error", { "allowAsStatement": true }] */

import fastify from 'fastify'
import fastifyShitty from '..'
let app
try {
  app = fastify()
  await app.ready()
  void app.register(fastifyShitty)
} catch (err) {
  console.error(err)
}
