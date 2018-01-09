import React, { Component } from 'react';

class ChirpItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chirp: {},
      likeChirp: {},
      unLikeChirp: {}
    }
  }

  componentDidMount() {
    this.setState({
      chirp: this.props.chirp,
      likeChirp: this.props.likeChirp,
      unLikeChirp: this.props.unLikeChirp,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      chirp: nextProps.chirp,
      likeChirp: nextProps.likeChirp,
      unLikeChirp: nextProps.unLikeChirp,
    })
  }

  render() {
    const { chirp, likeChirp, unLikeChirp } = this.state;;
    let usernameText = "";
    if (chirp.author && chirp.author.username) {
      let username = chirp.author.username
      usernameText = `${username} chrips:`
    }
    
    let likeButtonText = "You don't like this.";
    let likeButtonAction = () => likeChirp(chirp.id);
    if (chirp.liked_by_current_user) {
      likeButtonText = "You like this";
      likeButtonAction = () => unLikeChirp(chirp.id);
    }
    return (
      <li>
        <p>{usernameText}</p>
        <h3>{chirp.body}</h3>
        <p><strong>Likes: {chirp.like_count}</strong></p>
        <button onClick={likeButtonAction}>{likeButtonText}</button>
      </li>
    );
  }
}

export default ChirpItem;