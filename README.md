# kraken-flex-script

A script implemented with Typescript resolves KrakenFlex test.

## Run with installed Node.js

### Requirements

- Instal Node version 18.12.1 minimum.
- Install npm version: 8.19.2 minimum.
- Create a .env file at the project root for API_KEY, API_BASE_URL, API_TIMEOUT environment variables.

### Installation

```shell
npm ci
```

### Run

```shell
npm start
```

## Run with Docker

Build the image at the project root directory

```shell
docker build -t krakenflexscript .
```

Run the built image

```shell
docker run --env=API_KEY=[TO_BE_FILLED] --env=API_BASE_URL=[TO_BE_FILLED] --env=API_TIMEOUT=10000 krakenflexscript
```

## Test

```shell
npm test
```

## Linter Usage

To check linter rules:

```shell
npm run lint
```

To automatically apply linter rules:

```shell
npm run lint-fix
```

## Technologies

- [axios](https://www.npmjs.com/package/axios) for Http Client package
- [dotenv](https://www.npmjs.com/package/dotenv) for environment variable management

## Todo

- [retry-axios](https://github.com/JustinBeckwith/retry-axios) for Http Client retry mechanism can be implemented for request failures
