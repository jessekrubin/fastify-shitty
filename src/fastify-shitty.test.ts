import Fastify from "fastify";
import { describe, expect, test } from "vitest";
import { FastifyShitty } from "./fastify-shitty.js";

test("fastify-shitty", async () => {
  const fastify = Fastify();
  await fastify.register(FastifyShitty);

  fastify.get("/", {}, (_request, reply) => {
    reply.send({ hello: "world" });
  });
  await fastify.ready();

  const nreqs = 500;
  let nerrors = 0;
  const mkreq = async () => {
    const res = await fastify.inject({ method: "GET", url: "/" });
    if (res.statusCode !== 200) {
      nerrors++;
    }
  };
  await Promise.all(Array.from({ length: nreqs }, () => mkreq()));
  expect(nerrors).toBeGreaterThan(0);
});

describe("bad options", () => {
  test("odds < 0", async () => {
    const fastify = Fastify();
    const promise = fastify.register(FastifyShitty, { odds: -1 });
    await expect(promise).rejects.toThrow(
      "[@jsse/fastify-shitty] odds must be a number between 0 and 1",
    );
  });

  test("odds > 1", async () => {
    const fastify = Fastify();
    const promise = fastify.register(FastifyShitty, { odds: 2 });
    await expect(promise).rejects.toThrow(
      "[@jsse/fastify-shitty] odds must be a number between 0 and 1",
    );
  });
});
