# NestJS Template

## Requirements

```shell
docker >= 1.18.0
node = ^12
```

## Setup local infrastructure

1. PostgreSQL

```bash
docker run --name box3_postgres -e POSTGRES_USER=blox3 -e POSTGRES_PASSWORD=blox3 -e POSTGRES_DB=blox3 -p 5432:5432 -d postgres
```

2. Redis

```bash
$ docker run --name box3_redis -p 6379:6379 -d redis
```

3. Environment

```shell
$ cp .env.example .env
```

## Install dependencies

```bash
$ yarn
```

## Run migrations

```bash
$ npm run dbm:run
```

## Run app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# Run test
$ npm run test

# Run test watch
$ npm run test:watch

# Run test with coverage
$ npm run test:cov
```
