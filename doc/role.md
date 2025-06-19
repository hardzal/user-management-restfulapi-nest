# Role API Spec

## Create Role

Endpoint: POST /api/roles

Headers :

- Authorization: token

Request body :

```json
{
  "role": "owner",
  "description": "manage a user"
}
```

Response body :

```json
{
  "message": "success created a role",
  "data": {
    "role": "owner",
    "description": "manage a user",
    "created_at": "2023-12-31 15:30:45",
    "updated_at": ""
  }
}
```

## Get Role

Endpoint: GET /api/roles/:id

Headers :

- Authorization: token

No Request body

Response body :

```json
{
  "message": "success get a role",
  "data": {
    "role": "owner",
    "description": "manage a user",
    "created_at": "2023-12-31 15:30:45",
    "updated_at": ""
  }
}
```

## Update Role

Endpoint: PUT /api/roles/:id

Headers :

- Authorization: token

Request body :

```json
{
  "role": "owner",
  "description": "manage a user"
}
```

Response body :

```json
{
  "message": "success updated a role",
  "data": {
    "role": "owner",
    "description": "manage a user",
    "created_at": "2023-12-31 15:30:45",
    "updated_at": "2025-06-18 11:33:00"
  }
}
```

## Remove Role

Endpoint: DELETE /api/roles/:id

Headers :

- Authorization: token

No Request body

Response Body :

```json
{
  "message": "success remove a role",
  "data": true
}
```

## List Roles

Endpoint: GET /api/roles

Headers :

- Authorization: token

No Request body

Response body :

```json
{
  "message": "success get list roles",
  "data": [
    {
      "role": "owner",
      "description": "manage a user",
      "created_at": "2023-12-31 15:30:45",
      "updated_at": "2025-06-18 11:33:00"
    },
    {
      "role": "member",
      "description": "manage a user",
      "created_at": "2023-12-31 15:30:45",
      "updated_at": "2025-06-18 11:33:00"
    },
    {
      "role": "guest",
      "description": "manage a user",
      "created_at": "2023-12-31 15:30:45",
      "updated_at": "2025-06-18 11:33:00"
    }
  ]
}
```

## Assigment Permission to a role

Endpoint: POST /api/roles/:id/assignment-permission

Headers :

- Authorization: token

## Get Permission assigned to a role

Endpoint: GET /api/roles/:id/permissions

Headers :

- Authorization: token

## Remove permission from a role

Endpoint: DELETE /api/roles/:id/remove-permission

Headers :

- Authorization: token
