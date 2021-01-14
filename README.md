# Controls UI

## Development

Follow the set of instructions below to start the UI in development mode.

## Clone this repository

```shell
git clone https://github.com/carlosthe19916/controls-ui
```

## Start dependencies

This project depends on other resources:

- Keycloak (the authentication and authorization system)
- Controls (the backend API)

### Start keycloak

Use docker for starting keycloak:

```shell
docker run -p 8180:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak
```

- Open http://localhost:8180/auth
- Login using username=admin and password=admin
- Create a new realm importing the file `konveyor-realm.json` located in the root folder

## Start the UI

Install the npm dependencies:

```shell
yarn install
```

Start the UI:

```shell
yarn start
```

You should be able to open http://localhost:3000 and start working on the UI.
