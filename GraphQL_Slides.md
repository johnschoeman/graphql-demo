# Graph QL

---

## What Is GraphQL?

---

## Why Should I Care About GraphQL

- addresses common problems in modern web api's.
- makes your life easier as a developer.
- more and more companies are adopting it.
- lots of excitement in the community.

---

### Why GraphQL Useful?

Let's look at a basic use case in both REST and GraphQL.

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

The schema is a contract agreed on between the frontend and backend, so keeping it at the center allows both sides of the development to evolve without going off the spec. This also makes it easier to parallelize the work, since the frontend can move on with full knowledge of the API from the start

- easy

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
- Not easy to send non JSON data. 
- lack of documenation, espcially for ruby.

---


## Common Misconceptions

- GraphQL is not a database technology.

- GraphQL is an API technology following a specification.  It is not a language or framework.

Is GraphQL a Database Technology?
- No. GraphQL is often confused with being a database technology. This is a misconception, GraphQL is a query language for APIs - not databases. In that sense it’s database agnostic and can be used with any kind of database or even no database at all.

Is GraphQL only for React / Javascript Developers?
- No. GraphQL is an API technology so it can be used in any context where an API is required.
- On the backend, a GraphQL server can be implemented in any programming language that can be used to build a web server. Next to Javascript, there are popular reference implementations for Ruby, Python, Scala, Java, Clojure, Go and .NET.
- Since a GraphQL API is usually operated over HTTP, any client that can speak HTTP is able to query data from a GraphQL server.
Note: GraphQL is actually transport layer agnostic, so you could choose other protocols than HTTP to implement your server.

---

## Questions?


---

## Demo

---
