// Ref: https://www.fastify.io/docs/latest/Guides/Database/#redis
import Fastify from "fastify";
import fastifyRedis from "@fastify/redis";

const fastify = Fastify({ logger: true });

fastify.register(fastifyRedis, {
  host: "127.0.0.1",
  port: 6379, // Redis port
});

// Declare routes

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.get("/foo", function (req, reply) {
  const { redis } = fastify;
  redis.get(req.query.key, (err, val) => {
    reply.send(err || val);
  });
});

fastify.post("/foo", function (req, reply) {
  const { redis } = fastify;
  redis.set(req.body.key, req.body.value, (err) => {
    reply.send(err || { status: "ok" });
  });
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`server listening on ${fastify.server.address().port}`);
});

// TODO
// Continue. Ref: https://www.fastify.io/docs/latest/Guides/Getting-Started/

// /Database read/write
// await client.set("key", "value");
// const value = await client.get("key");
// console.log(value);

// await client.disconnect();

// Run the server!
// const start = async () => {
//   try {
//     await fastify.listen({ port: 3000 });
//     console.log(`server listening on ${fastify.server.address().port}`);
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };
// start();
