# Pokevoter service

## Install

Requires Node.js, Docker or PostgreSQL.

```sh
nvm use
npm ci
```

Create `.env` file and set up the variables:

```sh
cp .env.example .env
```

## Run the service in a docker container

Start the service:

```sh
docker-compose up -d
```

Shutdown the service:

```sh
docker-compose down
```

## Run the service locally

Install PostgreSQL and configure connection in the `.env` file (see .env.example for possible settings).

### Create initial tables in the database

Run the following command to generate the `init-pokemons.sql` file in the `scripts` folder.

```sh
npm run fetch-db
```

Run the SQL script in the database to create and initialize the tables.

### Run the dev server

```sh
npm run dev
```

### Run the compiled version

```sh
npm run build
npm run start
```
