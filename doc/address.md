# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:contactId/addressess

Headers :

- Authorization: token

Request body :

```json
{
  "street": "Example street, optional",
  "city": "City name, optional",
  "province": "Province name, optional",
  "country": "Country name, optional",
  "postal_code": "1231241"
}
```

Response body :

```json
{
  "data": {
    "id": 1,
    "street": "Example street, optional",
    "city": "City name, optional",
    "province": "Province name, optional",
    "country": "Country name, optional",
    "postal_code": "1231241"
  }
}
```

## Get Address

Endpoint : GET /api/contacts/:contactId/addressess/:addressId

Headers:

- Authorization: token

Response body :

```json
{
  "data": {
    "id": 1,
    "street": "Example street, optional",
    "city": "City name, optional",
    "province": "Province name, optional",
    "country": "Country name, optional",
    "postal_code": "1231241"
  }
}
```

## Update Address

Endpoint : PUT /api/contacts/:contactId/addressess/:addressId

Headers:

- Authorization: token

Request body :

```json
{
  "street": "Example street, optional",
  "city": "City name, optional",
  "province": "Province name, optional",
  "country": "Country name, optional",
  "postal_code": "1231241"
}
```

Response body :

```json
{
  "data": {
    "id": 1,
    "street": "Example street, optional",
    "city": "City name, optional",
    "province": "Province name, optional",
    "country": "Country name, optional",
    "postal_code": "1231241"
  }
}
```

## Delete Address

Endpoint : DELETE /api/contacts/:contactId/addressess/:addressId

Response body :

```json
{
  "data": true
}
```

## List Address

Headers:

- Authorization: token

Endpoint : POST /api/contacts/:contactId/addressess

Response body :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Example street, optional",
      "city": "City name, optional",
      "province": "Province name, optional",
      "country": "Country name, optional",
      "postal_code": "1231241"
    },
    {
      "id": 2,
      "street": "Example street, optional",
      "city": "City name, optional",
      "province": "Province name, optional",
      "country": "Country name, optional",
      "postal_code": "1231241"
    }
  ]
}
```
