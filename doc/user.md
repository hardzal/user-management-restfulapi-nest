# User API Spec

## Register User

Endpoint : POST /api/users

Request body :

```json
{
  "username": "first_user",
  "password": "password",
  "email": "example@gmail.com",
  "name": "first user"
}
```

Response body (success) :

```json
{
  "data": {
    "username": "first_user",
    "name": "name user",
    "email": "example@gmail.com"
  },
  "message": "success registered user"
}
```

Response body (failed) :

```json
{
  "errors": {
    "username.errors": ["error validation", "username already registered"]
  }
}
```

## Login User

Endpoint : POST /api/users/login

Request body :

```json
{
  "username": "first_user",
  "password": "password"
}
```

Response body (success) :

```json
{
  "data": {
    "username": "first_user",
    "name": "name user",
    "token": "token_session_id_generated"
  },
  "message": "success login user"
}
```

Response body (failed) :

```json
{
  "errors": "username or password wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :

- authorization: token

Response body (success) :

```json
{
  "data": {
    "username": "first_user",
    "name": "name user",
    "email": "example@gmail.com"
  },
  "message": "success get user"
}
```

Response body (failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :

- Authorization: token

Request body :

```json
{
  "username": "first_user", //optional
  "password": "password" //optional
}
```

Response body (success) :

```json
{
  "data": {
    "username": "first_user",
    "name": "name user",
    "email": "example@gmail.com"
  },
  "message": "success registered user"
}
```

Response body (failed) :

```json
{
  "errors": {
    "username.errors": ["error validation", "username already registered"]
  }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Response body (success) :

```json
{
  "data": true,
  "message": "success logout user"
}
```

Response body (failed) :

```json
{
  "errors": "user not found"
}
```

## Delete User

Endpoint : POST /api/users

Headers :

- Authorization: token

Response body (success) :

```json
{
  "message": "success delete user"
}
```

Response body (failed) :

```json
{
  "errors": "user not found"
}
```

## Role Assigment to User

Endpoint: POST /users/:id/assign-role

## GET User Roles

Endpoint: GET /api/users/:id/roles

## Remove User Role

Endpoint: DELETE /api/users/:id/remove-role/:id
