# Make a list 📝

App that will make a list based on image search

## Purpose 💖

Should result in a greater understanding of how to solve this using 3rd party APIs and other tools

## First time users only 🪴

- Pre-condition: [Docker](https://docs.docker.com/) is installed

```
docker run -p 6379:6379 -it redis/redis-stack:latest
```

## Install app 🐣

```
npm install
```

## Start app 🚀

Back end

1. Navigate to [server](./server) folder
2. Start redis server locally

```
docker start redis-stack
```

3. Start fastify server and redis client

```
node index
```

## Use the app 🚀

1. View webserver messages 📬 at [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
2. View database read/write output 💾 in the console

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

## License 📝

The work is under exclusive copyright by default.
