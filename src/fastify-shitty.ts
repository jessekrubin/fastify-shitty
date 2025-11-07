import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export type FastifyShittyOptions = {
  odds?: number;
  delay?: boolean;
};
export const pluginName = "@jsse/fastify-shitty";
const DEFAULT_OPTS: Required<FastifyShittyOptions> = {
  odds: 0.2,
  delay: true,
};

export const fastifyShittyAsync: FastifyPluginAsync<
  FastifyShittyOptions
> = async (fastify, opts) => {
  const shittyLog = fastify.log.child({ plugin: pluginName });

  const { odds, delay } = { ...DEFAULT_OPTS, ...opts };
  fastify.addHook("onRequest", (_request, _reply, done) => {
    const rand = Math.random();
    const err =
      rand > odds ? undefined : new Error("Houston we have a problem...");
    if (delay) {
      const delay = Math.floor(rand * 1000);
      shittyLog.info(`Delaying response by ${delay}ms`);
      setTimeout(
        () => {
          done(err);
        },

        delay,
      );
    } else {
      done(err);
    }
  });
};

export const FastifyShitty = fp(fastifyShittyAsync, {
  fastify: "5.x",
  name: pluginName,
});

export default FastifyShitty;
