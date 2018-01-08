import { request } from 'graphql-request';

const URL = "http://localhost:3000/graphql"

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
}`;

export const getChirps = () => {
  return request(URL, getChirpsQuery);
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
