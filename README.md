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
- PORT=3000
- DB_CONNECTION_STRING=mongodb://localhost:27017/library
- SECRET_KEY=secret
- EXPIRATION_TIME=5m (jwt expiration time)

# Run Project locally
- clone the project
- Install dependencies using `npm install`
- Run the project locally in development mode using `npm run dev`


# Run Project using Docker
- clone the project
- `npm run docker:up`

- It will start the server on port 3000 & api is available to consume
    - GET - http://localhost:3000/api/health
    - POST - http://localhost:3000/api/register
    - POST - http://localhost:3000/api/add-book
    - DELETE - http://localhost:3000/api/remove-book
    - PATCH - http://localhost:3000/api/borrow-book
    - PATCH - http://localhost:3000/api/return-book

# Request body

- GET - http://localhost:3000/api/health
No boday required


- POST - http://localhost:3000/api/register
```sh
{
    "username": "tom",
    "password": "123456789", // min 8 char
    "role": "librarian" // or "customer"
}
```
- Note - Access token is valid for 5 minutes once created


- POST - http://localhost:3000/api/add-book
`Authorization: Bearer <accessToken>`
```sh
{
    "username": "tom",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "1234567890",
    "year": 1995,
    "issued": false
}
```


- DELETE - http://localhost:3000/api/remove-book
`Authorization: Bearer <accessToken>`
```sh
{
    "username": "tom",
    "isbn": "1234567890"
}
```


- PATCH - http://localhost:3000/api/borrow-book
`Authorization: Bearer <accessToken>`
```sh
{
    "username": "tom",
    "isbn": "1234567890"
}
```


- PATCH - http://localhost:3000/api/return-book
`Authorization: Bearer <accessToken>`
```sh
{
    "username": "tom",
    "isbn": "1234567890"
}
```


# Build project
- `npm run build`


# Build & Run the project
- `npm run start`


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
