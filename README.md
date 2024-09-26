# book-library-api


## Service Specification
- API backend for a Book Library Web Application
- There are two types of users: 'Librarian' & 'Customer'
    - Librarian can add and remove books from the library
    - Customer can borrow and return them
- Authentication mechanism with jwt
- After authentication they're allowed to perform actions permitted by their access level


## Repo : https://github.com/deepaktomar2031/book-library-api
## Branch:
- Main Branch - `master`


# Required ENV's
- PORT=4000
- DB_CONNECTION_STRING=mongodb://localhost:27017/library
- SECRET_KEY=secret
- EXPIRATION_TIME=25m (jwt expiration time)


# Run Project using Docker
- clone the project
- `npm run docker:dev` // Development mode
- `npm run docker:prod` // Production mode

- It will start the server on port 4000 & api is available to consume

    - GET - http://localhost:4000/api-docs

    - GET - http://localhost:4000/api/health
    - POST - http://localhost:4000/api/register
    - POST - http://localhost:4000/api/login
    - POST - http://localhost:4000/api/add-book
    - DELETE - http://localhost:4000/api/remove-book
    - PATCH - http://localhost:4000/api/borrow-book
    - PATCH - http://localhost:4000/api/return-book

# Request body

- GET - http://localhost:4000/api/health
No boday required


- POST - http://localhost:4000/api/register
```sh
{
    "username": "user1",
    "password": "123456789", // min 8 char
    "role": "librarian" // or "customer"
}
```

- POST - http://localhost:4000/api/login
```sh
{
    "username": "user1",
    "password": "123456789",
}
```
- Note - Access token is valid for 25 minutes once created


- POST - http://localhost:4000/api/add-book
`Authorization: Bearer <accessToken>`
```sh
{
    "username": "user1",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "1234567890",
    "year": 1995,
    "issued": false
}
```


- DELETE - http://localhost:4000/api/remove-book
`Authorization: Bearer <accessToken>`
```sh
{
    "username": "user1",
    "isbn": "1234567890"
}
```


- PATCH - http://localhost:4000/api/borrow-book
`Authorization: Bearer <accessToken>`
```sh
{
    "username": "user1",
    "isbn": "1234567890"
}
```


- PATCH - http://localhost:4000/api/return-book
`Authorization: Bearer <accessToken>`
```sh
{
    "username": "user1",
    "isbn": "1234567890"
}
```


# Project Structure
    - docs/
        - diagram/
            - Project flow diagram
        - swagger/
            - Swagger API documentation
    - src/
        - index.ts - entry point of the project, server.ts helps to create the server
        - routes/ - has routes to the API end-point
        - controllers/ - has controllers to make perform asked actions (register/add/remove/borrow/return book)
        - validators/ - has a validators schema to validate the incoming request's body & required fields
        - middlewares/ - has middlewares to validate & authenticate the the incoming request
        - interfaces/ - has interfaces used through out the project
        - constants/ - has all constants used in project
        - utils/ - has common functionality used through out the project (messages, HTTP Codes, enums, error handler etc..)
        - adapters/ - has adapters that implement DB functions to save/delete/fetch data
        - config/ - has connection to DB
        - models/ - has DB collection schema
    - Dockerfile - docker file
    - docker-compose.yml - yml file with all configurations
