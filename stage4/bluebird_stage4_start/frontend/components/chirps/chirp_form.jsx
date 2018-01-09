import React, { Component } from 'react';

class ChirpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chirpBody: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let chirp = {
      body: this.state.chirpBody,
      author_id: this.props.currentUser.id
    }
    this.props.createChirp(chirp)
    .then(() => {
      this.setState({chirpBody: ""});
    })
  }

  handleChange(e) {
    this.setState({chirpBody: e.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
           type="text" 
           placeholder="Write a chrip..." 
           onChange={this.handleChange}
           value={this.state.chirpBody} />
          <input type="submit" value="Chirp"/>
        </form>
      </div>
    )
  }
}

export default ChirpForm;