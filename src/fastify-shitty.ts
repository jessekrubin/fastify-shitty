import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

export const pluginName = '@jsse/fastify-shitty';
export const defaultOpts = {
  odds: 0.2,
  delay: true,
};

export const fastifyShittyAsync: FastifyPluginAsync<
  typeof defaultOpts
> = async (fastify, opts) => {
  const shittyLog = fastify.log.child({ plugin: pluginName });
  const options = { ...defaultOpts, ...opts };
  const { odds, delay } = options;
  fastify.addHook('onRequest', (request, reply, done) => {
    const rand = Math.random();
    const err =
      rand > odds ? undefined : new Error('Houston we have a problem...');
    if (delay === true) {
      const delay = Math.floor(rand * 1000);
      shittyLog.info(`Delaying response by ${delay}ms`);
      setTimeout(
        () => {
          done(err);
        },

        delay
      );
    } else {
      done(err);
    }
  });

  fastify.decorate('exampleDecorator', () => {
    return 'decorated';
  });
};

export const FastifyShitty = fp(fastifyShittyAsync, {
  fastify: '4.x',
  name: pluginName,
});

export default FastifyShitty;
