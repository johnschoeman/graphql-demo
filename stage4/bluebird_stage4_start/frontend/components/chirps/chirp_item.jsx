import React from 'react';

export default ({ chirp, likeChirp, unLikeChirp }) => {
  let likeButtonText = "You don't like this.";
  let likeButtonAction = () => likeChirp(chirp.id);
  if (chirp.liked_by_current_user) {
    likeButtonText = "You like this";
    likeButtonAction = () => unLikeChirp(chirp.id);
  }
  return (
    <li>
      <p>{chirp.author.username} chrips:</p>
      <h3>{chirp.body}</h3>
      <p><strong>Likes: {chirp.like_count}</strong></p>
      <button onClick={likeButtonAction}>{likeButtonText}</button>
    </li>
  );
}
