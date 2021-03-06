<!-- https://s-pangburn.github.io/slides/ -->
# Graph QL

---

### What Is GraphQL?

---

GraphQL is an API standard which provides a ***single dynamic*** endpoint for data fetching.

---

GraphQL is an alternative to the RESTful API design pattern, which provides multiple static endpoints.

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
(fetches exactly the data we ask for, not the entire set of user data)

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

How many request response cycles does it take to get a user's profile-data, chirps, and followers?

```
GET: api/users/1729
GET: api/users/1729/chirps
GET: api/users/1729/followers
```

---

The GraphQL analog:
(only sends one request to the server)

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

How would we get the likes of the chirps of a user's followers? 
(Without breaking RESTful conventions)

```
GET: '???'
```

---

Queries in GraphQL are nestable and extensible.
Allowing us to recieve more complicated collections of data.

```javascript
 query {
    getUser(user_id: 1729) {
      id
      email
      followers {
        id
        name
        chirps {
          id
          text
          likes {
            id
            user_id
            chipr_id
          }
        }
      }
    }
  }
```

---

### In Short

GraphQL allows a client to request exactly what data it needs.

---

### Technical Bonuses For Using GraphQL

- Solves over/under fetching issues (N + 1)

- Allows for easy client side cacheing (Apollo Client/Relay)

- Can be used to greatly improve precieved load time on view layers.  

---

### Organizational Bonuses For Using GraphQL

- Allows for parallelization of workflow.  (FE vs BE)

- Can integrate legacy systems, micro services, external apis, etc, and hide that complexity from the client.

- Removes time consuming coordination of the api/routes, we can focus on the data and not implementation details.

- GraphQL requests are self-documenting.

---

### Down Sides of GraphQL

- difficult to implement server side cacheing.
- upfront costs of setting up gql server.
- graphql is a thin data aplication layer, it does not solve all the problems.
- additional security concerns.
- lack of documenation and tooling, espcially for ruby.

---

### Common Misconceptions

- GraphQL is an API technology, not a database technology.

- GraphQL is a specification, not a specific language, library, or framework.

- GraphQL is a server-side technology and is frontend framework agnositic.

---

## How Does GraphQL Work?

---

GraphQL provides a complete description of the data in your API by defining a strongly typed ***schema*** which dictactes an abstracted graph of the application data.

---

GraphQL then provides entry points to this graph and traverses the graph using ***resolver*** functions to generate a data tree of the requested data, which is returned to the client.

---

## Questions?

---

## Demo

---
