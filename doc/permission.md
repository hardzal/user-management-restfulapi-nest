# Permission Spec API

## Permission Create

Endpoint: POST /api/permissions

Headers :

- Authorization: token

Request body :

```json
{
  "permission": "CREATE",
  "description": "manage a user"
}
```

Response body :

```json
{
  "message": "success created a role",
  "data": {
    "permission": "CREATE",
    "description": "created thing",
    "created_at": "2023-12-31 15:30:45",
    "updated_at": ""
  }
}
```

## Permission Get

Endpoint: GET /api/permissions/:id

Headers :

- Authorization: token

No Request body

Response body :

```json
{
  "message": "success cet a role",
  "data": {
    "permission": "CREATE",
    "description": "created thing",
    "created_at": "2023-12-31 15:30:45",
    "updated_at": ""
  }
}
```

## Permission Update

Endpoint: PUT /api/permissions

Headers :

- Authorization: token

```json
{
  "permission": "CREATE",
  "description": "manage a user updated"
}
```

Response body :

```json
{
  "message": "success updated a role",
  "data": {
    "permission": "CREATE",
    "description": "created thing",
    "created_at": "2023-12-31 15:30:45",
    "updated_at": ""
  }
}
```

## Permission Remove

Endpoint: DELETE /api/permissions/:id

Headers :

- Authorization: token

No request body

Response body :

```json
{
  "message": "succes remove a permission",
  "data": true
}
```
