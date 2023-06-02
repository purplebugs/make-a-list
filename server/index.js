import { createClient } from "redis";

// Require the framework and instantiate it
import Fastify from "fastify";
const fastify = Fastify({ logger: true });

// Create a Redis instance and connect to localhost:6379
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

// Database read/write
await client.set("key", "value");
const value = await client.get("key");
console.log(value);

await client.disconnect();

// Declare a route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
