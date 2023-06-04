// Ref: https://www.fastify.io/docs/latest/Guides/Database/#redis

import Fastify from "fastify";
import { Redis } from "ioredis";
import { v4 as uuidv4 } from "uuid";

const fastify = Fastify({ logger: true });
const redis = new Redis();

// Declare routes

fastify.get("/", async () => {
  return { hello: "world" };
});

fastify.post("/api/list", async (req, reply) => {
  const id = uuidv4();

  // const body = {
  //   id: "item-123",
  //   url: "my-url",
  // };

  redis.set(id, "anita");

  reply.send(id);
});

fastify.get("/api/list/:id", async (req, reply) => {
  const value = await redis.get(req.params.id);
  reply.send(value);
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
