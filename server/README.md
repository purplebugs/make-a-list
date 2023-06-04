# APIs

## User flow

1. Analyze image using 3rd party software
2. Get list of possible items
3. Select one item
4. Add item to list

## POST /api/image/analyze

- POST binary image
- Return list of possible image matches

```JSON
[
    {
        "id":"id",
        "url":"url"
    }
]
```

## POST /api/list

- POST selected search result item in form of JSON

```JSON
[
    {
        "id":"id",
        "url":"url"
    }
]
```

- Return uuid

## GET /api/list/:id

- Send in uuid of list
- Return list in form of JSON

```JSON
{
    "uuid": "uuid",
    "items": [
        {
            "id":"id",
            "url":"url"
        }
    ]
}
```
