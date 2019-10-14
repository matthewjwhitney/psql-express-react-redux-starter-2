import React, { Component } from 'react';
import axios from '../../utils/axios_instance';
import history from '../../utils/history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import '../../App.css';
import './Blog_Styles/blog_styles.css';



class AddPost extends Component {
  handleSubmit = event => {
    event.preventDefault()
    const user_id = this.props.db_profile[0].uid
    const username = this.props.db_profile[0].username
    const data = {title: event.target.title.value, body: event.target.body.value, username: username, uid: user_id}
    axios.post('api/post/poststodb', data)
      .then(response => console.log(response))
      .catch(function (error) {
        console.log(error);
      })
      .then(setTimeout( function() { history.replace('/') }, 700))
     }

  render() {
    return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="title"
          label="Title"
          margin="normal"
        />
        <br/>
          <TextField
          id="body"
          label="Post"
          multiline
          rows="4"
          margin="normal"
        />
        <br/>
          <Button variant="contained" color="primary" type="submit" >Submit</Button>
      </form>
      <br />
       <span>
        <button className="CancelButton" onClick={() => history.replace('/posts')}> Cancel </button>
       </span>
    </div>

  )};
}

function mapStateToProps(state) {
    return {
        db_profile: state.auth_reducer.DBUserProfile
    };
}

export default connect(mapStateToProps)(AddPost);
