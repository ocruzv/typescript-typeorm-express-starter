# TypeScript + TypeORM + Express + JWT Authentication Starter Kit

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `.env` file
3. Run `npm run dev` command
4. The server is now running at the port 3000 (default)

If you wanna run a local Postgres DB with the project, you can do it pretty easy if you have Docker running and Docker Compose installed.

1. Run `docker-compose up -d` to run the Postgres container
2. Run `docker exec -it my_postgres psql -U postgres -c "create database typeormstarter"` to create a new database

If you run this way, you dont need to update the .env file.

## How to create the first user

1. Ensure your database is up and running
2. Ensure your environment variables to connect to the database are set on the .env file or in the system environment
3. Run `npm run dev` to let the ORM create the basic database structure
4. Run `npm run migration:run`
5. Your username was created with the credentials `admin@myemail.com:admin`

## How to add new routes

Just go to `/src/router/v1` and create a new file `.ts`. You can take the `user.ts` as example. Your routes will be exposed under `/api/v1/<fileName>/<path>`.
