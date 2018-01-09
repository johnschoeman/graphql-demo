import React from 'react';
import ChirpItem from './chirp_item';
import ChirpForm from './chirp_form';

class ChirpIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchChirps();
  }

  render() {
    const { chirps, chirpIds } = this.props;
    return (
      <div>
        <ChirpForm
          currentUser={this.props.currentUser}
          createChirp={this.props.createChirp}
        />
        <ul>
          {
            chirpIds.map(chirpId => (
              <ChirpItem
                key={`chirp${chirpId}`}
                chirp={chirps[chirpId]}
                likeChirp={this.props.likeChirp}
                unLikeChirp={this.props.unLikeChirp}/>
              )
            )
          }
        </ul>
       
      </div>
    )
  }
}

export default ChirpIndex;
