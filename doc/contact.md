# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :

- Authorization: token

Request body :

```json
{
  "first_name": "user_first",
  "last_name": "last_user",
  "email": "user_first@example.com",
  "phone": "62381931231"
}
```

Response body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "user_first",
    "last_name": "last_user",
    "email": "user_first@example.com",
    "phone": "62381931231"
  }
}
```

Response body (failed) :

```json
{
  "errors": "data already found"
}
```

## Get Contact

Endpoint : POST /api/contacts/:contactId

Headers :

- Authorization: token

Response body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "user_first",
    "last_name": "last_user",
    "email": "user_first@example.com",
    "phone": "62381931231"
  }
}
```

## Update Contact

Endpoint : PUT /api/contacts/:contactId

Headers :

- Authorization: token

Request body :

```json
{
  "first_name": "user_first",
  "last_name": "last_user",
  "email": "user_first@example.com",
  "phone": "62381931231"
}
```

Response body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "user_first",
    "last_name": "last_user",
    "email": "user_first@example.com",
    "phone": "62381931231"
  }
}
```

## Delete Contact

Endpoint : DELETE /api/contacts/:contactId

Headers :

- Authorization: token

Response body (success) :

```json
{
  "data": true
}
```

## Search Contact

Endpoint : GET /api/contacts

Headers :

- Authorization: token

Search Params :

- name: string, contact first_name or contact last_name: string, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Request body :

```json
{
  "first_name": "user_first",
  "last_name": "last_user",
  "email": "user_first@example.com",
  "phone": "62381931231"
}
```

Response body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "user_first",
      "last_name": "last_user",
      "email": "user_first@example.com",
      "phone": "62381931231"
    },
    {
      "id": 1,
      "first_name": "user_first",
      "last_name": "last_user",
      "email": "user_first@example.com",
      "phone": "62381931231"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
