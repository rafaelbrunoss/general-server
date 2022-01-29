# general-server

General server created using an enterprise level architecture

## Architecture

This project uses the `onion architecture` and it follows the following principles:

- SOLID
- 12 Factor

## Technologies

- Typescript
- Express
- GraphQL
- Inversify
- Sequelize
- Postgres
- Redis
- Prometheus
- Winston

## Structure

**core** (layer with the core of the application)
domain
application

**infrastructure** (layer with the adapters to the infrastructure tools)

**user_interface** (layer with the adapters to the interface with the user)

**dependencies** (it contains the dependencies to the other layers of the application)

**modules** (modules of the application)

## How to run

### Development

- npm run dev

### Test

- npm run test

### Production

- npm run prod

Inspired by:

- https://github.com/Melzar/onion-architecture-boilerplate
- https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/
