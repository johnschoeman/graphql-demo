export const RECEIVE_CHIRPS = 'RECEIVE_CHIRPS';
export const RECEIVE_SINGLE_CHIRP = 'RECEIVE_SINGLE_CHIRP';
import { getChirps, postLikeToChirp, deleteLikeFromChirp, postChirp } from '../utils/chirps';


const receiveChirps = chirps => ({
  type: RECEIVE_CHIRPS,
  chirps
});

const receiveSingleChirp = chirp => ({
  type: RECEIVE_SINGLE_CHIRP,
  chirp
});

export const fetchChirps = () => dispatch => {
  return getChirps()
    .then(data => dispatch(receiveChirps(data.allChirps)))
    .catch(error => console.log(error));
}

export const createChirp = (chirp) => dispatch => {
  return postChirp(chirp)
    .then(chirp => dispatch(receiveSingleChirp(chirp)))
}

export const likeChirp = id => dispatch => {
  return postLikeToChirp(id)
    .then(chirp => { dispatch(receiveSingleChirp(chirp)) });
}

export const unLikeChirp = id => dispatch => {
  return deleteLikeFromChirp(id)
    .then(chirp => dispatch(receiveSingleChirp(chirp)));
}
