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
  // TODO check if id exists in Redis.  If so generate a new one and continue.

  const item_1 = { id: "item-1", value: "something in here" };
  await redis.hset(id, item_1);

  reply.send(id);
});

fastify.get("/api/list/:id", async (req, reply) => {
  // TODO if :id does not exist in Redis return 404
  // https://www.fastify.io/docs/latest/Reference/Reply/#codestatuscode

  const value = await redis.hget(req.params.id, "value");
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
