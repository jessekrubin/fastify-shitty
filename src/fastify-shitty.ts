import type { FastifyPluginAsync, FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

export type FastifyShittyOptions = {
  /**
   * The odds of a request failing; a number between 0 and 1. Defaults to 0.2 (20%).
   * @default 0.2
   */
  odds?: number;
  /**
   * Whether to delay the response by a random amount of time (up to 1 second). Defaults to true.
   * @default true
   */
  delay?: boolean;
};

export const pluginName = "@jsse/fastify-shitty";
const DEFAULT_OPTS: Required<FastifyShittyOptions> = { odds: 0.2, delay: true };

export const fastifyShittyCallback: FastifyPluginCallback<
  FastifyShittyOptions
> = (fastify, opts, done) => {
  const shittyLog = fastify.log.child({ plugin: pluginName });

  const { odds, delay } = { ...DEFAULT_OPTS, ...opts };
  if (odds < 0 || odds > 1) {
    throw new Error(
      "[@jsse/fastify-shitty] odds must be a number between 0 and 1",
    );
  }
  fastify.addHook("onRequest", (_request, _reply, done) => {
    const rand = Math.random();
    const err =
      rand > odds ? undefined : new Error("Houston we have a problem...");
    if (delay) {
      const delay = Math.floor(rand * 1000);
      shittyLog.info(`Delaying response by ${delay}ms`);
      setTimeout(() => {
        done(err);
      }, delay);
    } else {
      done(err);
    }
  });
  done();
};

export const fastifyShittyAsync: FastifyPluginAsync<
  FastifyShittyOptions
> = async (fastify, opts) => {
  await new Promise<void>((resolve, reject) => {
    fastifyShittyCallback(fastify, opts, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const FastifyShitty = fp(fastifyShittyAsync, {
  fastify: "5.x",
  name: pluginName,
});

export default FastifyShitty;
