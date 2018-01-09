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
    likes {
      id
      chirp_id
      user_id
    }
  }
}`;

export const getChirps = () => {
  return client.request(getChirpsQuery);
}

export const postChirp = (chirp) => {
  return $.ajax({
    url: '/api/chirps',
    method: 'POST',
    data: { chirp }
  })
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
