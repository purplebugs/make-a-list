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
  let id = uuidv4();
  const idExists = (await redis.get(id)) ? true : false;

  if (idExists) {
    id = uuidv4();
  }

  const items = [
    { id: "item:1", url: "some url of a found item 1" },
    { id: "item:2", url: "some url of a found item 2" },
    { id: "item:3", url: "some url of a found item 3" },
  ];

  await redis.set(id, JSON.stringify(items));

  reply.send(id);
});

fastify.get("/api/list/:id", async (req, reply) => {
  const items = await redis.get(req.params.id);

  if (!items) {
    reply.code(404).send({
      message: "id not found",
    });
  }
  reply.send({
    uuid: "uuid",
    items: JSON.parse(items),
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
