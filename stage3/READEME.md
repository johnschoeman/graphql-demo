# ReactJS + GraphQL-Request

In this stage will will continue with bluebird and connect our frontend to our new GraphQL endpoint.

### Step 1: 

```bash
npm install graphql-request
```


### Step 2:

add the following code to the frontend utils file:

```javascript
// /frontend/utils/chirps.js

import { GraphQLClient } from 'graphql-request' // 1.)
const URL = "http://localhost:3000/graphql"  // 2.)

const client = new GraphQLClient(URL, {
  credentials: 'include',
  mode: 'cors'
})  // 3.)

const getChirpsQuery = `{
  allChirps {
    id
    body
    author_id
    like_count
    liked_by_current_user
    likes {
      id
      chirp_id
      user_id
    }
  }
}`;  // 4.)

export const getChirps = () => {
  return client.request(getChirpsQuery);
}  // 5.)

...

```

### Step 3:

Update the action creator to handle the new shape of the response data

```javascript
// /frontend/actions/chirps.js
export const fetchChirps = () => dispatch => {
  return getChirps()
    .then(chirps => dispatch(receiveChirps(chirps.allChirps)));
}
```

Verify that the frontend is correctly recieving the data.


## Exercises

Create a UserType for the graphQL schema and make a relation on the ChirpType that returns the chirps author.  Once your GQL server can handle requests that ask for the chirps author, adjust your gql-request from the react frontend to ask for that data and display it next to the chirp.

See stage4 start for solutions