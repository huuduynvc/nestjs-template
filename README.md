# NestJS Template

## Requirements

```shell
docker >= 1.18.0
node = ^12
```

## Setup local infrastructure

1. PostgreSQL

Install postgre in docker compose, using config database in env to connect after

```bash
yarn postgre:init
```

Sync database: create table database from code

```bash
yarn dbm:init
```

2. Redis

Currently, not working

```bash
$ docker run --name marketplace-api_redis -p 6379:6379 -d redis:6
```

3. Environment

```shell
$ cp .env.example .env
```

## Install dependencies

```bash
$ yarn
```

## Install common libs

```bash
$ npx meta git update
$ npx meta git checkout main --include-only libs
```

or

```bash
yarn libs:build
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
