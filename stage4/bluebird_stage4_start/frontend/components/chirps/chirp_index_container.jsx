import React from 'react';
import ChirpIndex from './chirp_index';
import { fetchChirps, likeChirp, unLikeChirp, createChirp } from '../../actions/chirps';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    chirps: state.entities.chirps.byId,
    chirpIds: state.entities.chirps.allIds,
    currentUser: state.session.currentUser
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchChirps: () => dispatch(fetchChirps()),
  likeChirp: id => dispatch(likeChirp(id)),
  unLikeChirp: id => dispatch(unLikeChirp(id)),
  createChirp: chirp => dispatch(createChirp(chirp))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChirpIndex);
