# Graph QL

---

## What Is GraphQL?

---

### Why Should I Care About GraphQL

- More and more companies are adopting it.
- Lots of excitement in the community.
- Makes your life easier as a developer.

[GraphQL Users](http://graphql.org/users/)

---

### What Problems Does GraphQL Solve

1. Increased mobile usage created need for more efficient client server communicaiton.

2. Varity of client applications that all have slightly different requirements.

3. Expectation of rapid feature development.

---

### GraphQL vs RESTful Comparision

---

What data is being returned with this RESTful API request?

```
  GET: api/users/1729
```

---

The GraphQL analog:

```javascript
  query {
    getUser(user_id: 1729) {
      id
      name
      image_url
      email
    }
  }
```

---

which returns a json object:

```javascript
{
  "data": {
    "getUser": {
      "id": "1729",
      "name": "David Hilbert",
      "image_url": "pseudo_hilbert_curveQ28VND2D2.png",
      "email": "david@gmail.com"
    }
  }
}
```

---

How many request response cycles does this take?

```
GET: api/users/1729
GET: api/users/1729/chirps
GET: api/users/1729/followers
```

---

The GraphQL analog

```javascript
 query {
    getUser(user_id: 1105) {
      id
      email
      chirps {
        id
        text
      }
      followers {
        id
        name
      }
    }
  }
```

---

Which Returns the Following JSON object

```javascript
{
  "data": {
    "getUser": {
      "id": "1105",
      "name": "Kurt Gödel",
      "chirps": [
        {
          "id": "2465",
          "text": "Some things are undecidable."
        },
        ...
      ],
      "followers": [
        {
          "id": "1729"
          "name": "David Hilbert"
        },
        ...
      ]
    }
  }
}
```

---

Queries are extensible.
Allowing for more complicated views without making new endpoints.

```javascript
 query {
    getUser(user_id: 1729) {
      id
      email
      followers {
        id
        name
        tweets {
          id
          text
        }
      }
    }
  }
```

---

## Bonuses For Using GraphQL

- solves over/under fetching issues (N + 1)

- allows for easy client side cacheing

- Allows for parallelization of workflow.

---

## How Does GraphQL Work?

- the graph
- backend implementation
- frontend implementation

---

## Down Sides of GraphQL

- difficult to implement server side caching.
- upfront costs of setting up gql server.
- graphql is a thin data aplication layer, it does not solve all the problems.
- lack of documenation and tooling, espcially for ruby.

---


## Common Misconceptions

- GraphQL is not a database technology.

- GraphQL is an API technology following a specification.  It is not a language or framework.

---

## Questions?

---

## Demo

---
