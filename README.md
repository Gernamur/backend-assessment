# Backend Assesment

API handling users and policies resources that is JWT authenticated and tested

## Environment variables

Environment variables can be set by creating a .env file on the project root

### Env vars

- PORT (port where is listening the server)
- API_SECRET (jwt secret tu sign and decrpt tokens)
- USERS_SRC (expected url where the users service is fed from)
- POLICIES_SRC (expected url where the policies service is fed from)

## Documentation

Complete documentation of the API can be found by launching apidoc service.

```
npm run apidoc
```

By default apidoc is served at localhost:3999/doc


## Test

Run the following command
```
npm run test
```

## Authentication

Authentication at POST /token requires email & password

Users service sourced at (http://www.mocky.io/v2/5808862710000087232b75ac) is not providing any password so password is mocked from ID

## Development environment

- Windows 10
- Visual Studio Code 1.48.2
- Node v12.18.3


