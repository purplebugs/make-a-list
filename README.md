# Make a list 📝

App that will make a list based on image search

## Purpose 💖

Should result in a greater understanding of how to solve this using 3rd party APIs and other tools

## First time users only 🪴

Pre-condition: Redis server is installed and running locally

Redis on [install-redis-on-mac-os](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/)

-

```
# Install
brew install redis

# Start
redis-server
```

or use Docker

- [Docker](https://docs.docker.com/) is installed
- Install `redis-stack`

```
# Install
docker run -p 6379:6379 -it redis/redis-stack:latest

# Start
docker start redis-stack
```

## Install app 🐣

```
npm install
```

## Start app 🚀

Back end

1. Navigate to [server](./server) folder

2. Start fastify server and redis client

```
node index
```

## Use the app 🚀

1. View webserver message 📬 at [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
2. Send GET/POST HTTP requests using Postman database read/write output 💾 in the console

Examples

```
POST http://localhost:3000/foo

{
    "value": "anita"
}
```

```
GET http://localhost:3000/foo
```

## Stop app 🚀

1. Stop redis server locally

```
docker stop redis-stack
```

## Troubleshooting 🔥

Check which docker containers are running

```
docker ps
```

## API reference 🤖

See [server/README.md](server/README.md)

## License 📝

The work is under exclusive copyright by default.
