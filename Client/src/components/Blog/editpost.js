import React, { Component } from 'react';
import axios from '../../utils/axios_instance';
import history from '../../utils/history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import './Blog_Styles/blog_styles.css';


class EditPost extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)

    this.state = {
      title: '',
      body: ''
    }

  }

  componentDidMount() {
    this.setState({
      title: this.props.location.state.post.post.title,
      body: this.props.location.state.post.post.body
    })
  }


  handleTitleChange (event) {
    this.setState({title: event.target.value})
  }

  handleBodyChange (event) {
    this.setState({body: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state)

    const user_id = this.props.db_profile[0].uid
    const username = this.props.db_profile[0].username
    const pid = this.props.location.state.post.post.pid
    console.log(user_id)
    const data = {title: event.target.title.value, body: event.target.body.value, pid: pid,  uid: user_id, username: username}
    axios.put('api/put/post', data)
      .then(response => console.log(response))
      .catch(function (error) {
        console.log(error);
      })
      .then(setTimeout( function() { history.replace('/profile') }, 700))
     }

  render() {
    return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="title"
          label="Title"
          margin="normal"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <br/>
          <TextField
          id="body"
          label="Post"
          multiline
          rows="4"
          margin="normal"
          value={this.state.body}
          onChange={this.handleBodyChange}
        />
        <br/>
          <Button variant="contained" color="primary" type="submit" >Submit</Button>
          <br />
      </form>
      <br />
      <button className="CancelButton" onClick={() => history.goBack()} > Cancel </button>

    </div>
  )};
}

function mapStateToProps(state) {
    return {
        db_profile: state.auth_reducer.DBUserProfile
    };
}

export default connect(mapStateToProps)(EditPost);
