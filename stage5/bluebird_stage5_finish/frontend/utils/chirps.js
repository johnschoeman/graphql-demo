import { GraphQLClient } from 'graphql-request'
const URL = "http://localhost:3000/graphql"

const client = new GraphQLClient(URL, {
  credentials: 'include',
  mode: 'cors'
})

const getChirpsQuery = `{
  allChirps {
    id
    body
    author_id
    author {
      username
    }
    like_count
    liked_by_current_user
  }
}`;

const createChirpMutation = `
  mutation createChirp($body: String!, $author_id: Int!) {
    createChirp(body: $body, author_id: $author_id) {
      id
      body
      author_id
      author {
        username
      }
      like_count
      liked_by_current_user
    }
  }
`

export const getChirps = () => {
  return client.request(getChirpsQuery);
}

export const postChirp = (chirp) => {
  console.log('creating chirp...');
  console.log('chirp: ', chirp);
  return client.request(createChirpMutation, chirp)
}

export const postLikeToChirp = id => {
  return $.ajax({
    url: '/api/likes',
    method: 'POST',
    data: { id }
  });
}

export const deleteLikeFromChirp = id => {
  return $.ajax({
    url: '/api/likes',
    method: 'DELETE',
    data: { id }
  });
}
