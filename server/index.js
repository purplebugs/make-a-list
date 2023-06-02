// Ref: https://www.fastify.io/docs/latest/Guides/Database/#redis

import Fastify from "fastify";
import fastifyRedis from "@fastify/redis";
import { v4 as uuidv4 } from "uuid";

const fastify = Fastify({ logger: true });

fastify.register(fastifyRedis, {
  host: "127.0.0.1",
  port: 6379, // Redis port
});

// Declare routes

fastify.get("/", async () => {
  return { hello: "world" };
});

fastify.get("/foo", async (req, reply) => {
  const { redis } = fastify;
  return redis.get(req.query.key, (err, val) => {
    reply.send(err || val);
  });
});

fastify.post("/foo", async (req, reply) => {
  const id = uuidv4();
  const { redis } = fastify;
  const body = {
    key: id,
    value: req.body.value,
  };
  return redis.set(req.body.key, body, (err) => {
    reply.send(err || { id: id });
  });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

// TODO
// Continue. Ref: https://www.fastify.io/docs/latest/Guides/Getting-Started/
