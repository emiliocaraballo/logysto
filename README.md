# pruebas - Emilio

## Description

Línea de base para iniciar un proyecto de Express

## Installation

```bash
# instalacion de dependencias
$ npm i
# o
$ yarn install

# creación del archivo .env basado en el archivo .env.example
$ cp .env.example .env

# ------ paso opcional -------
# si no tiene una base de datos, puede crear una docker-compose.yml 
# archivo basado en el docker-compose.yml.example archivo en el proyecto


# Nota: si se ejecuta directamente desde docker el backend el host de base de dato
# en el archivo .env DB_HOST debe ir asi
# DB_HOST='postgresql',
# si se encuentra en fuera de docker
# DB_HOST='localhost',

$ cp docker-compose.yml.example docker-compose.yml
$ docker-compose up

# debe haber instalado previamente docker y docker-compose en
# tu ordenador, para que funcione correctamente, si todo está correcto
# debe tener lista la base de datos de su proyecto.
# ------ paso opcional -------

# ejecución de migraciones
$ npm run migrate:up
# o
$ yarn migrate:up

# ejecución de seeds
$ npm run seed:run

# ------ step optional -------
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run build
$ npm run start
```

## Endpoints

```bash
# the default paths of the project are:
$ http://localhost:3000/api/users
$ http://localhost:3000/api/users/login
$ http://localhost:3000/api/users/refresh
$ http://localhost:3000/api/direction?search?direction=chile&country=CO&lat=4.66026&lon=-74.06324


Documentación en Swagger 
$ http://localhost:3000/api/docs
```

## Test

```bash
# unit tests
$ npm run test
```