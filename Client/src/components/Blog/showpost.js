import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import * as ACTIONS from '../../store/actions/actions';
import axios from '../../utils/axios_instance';
import history from '../../utils/history';
import moment from 'moment';

import { Transition  } from 'react-spring';
import { animated } from 'react-spring';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import './Blog_Styles/blog_styles.css';


const defaultStyles = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '10px'
}

class ShowPost extends Component {
  state = {
    open: false,
    comment: '',
    cid: '',
    opacity: 0,
    likes: this.props.location.state.post.post.likes,
    like_user_ids: this.props.location.state.post.post.like_user_id,
    like_post: true,
    comments_arr: [],
    comments_motion : [],
    cur_user_id: null
  }

  componentDidMount() {
    axios.get('api/get/allpostcomments', {params: { post_id: this.props.location.state.post.post.pid}})
      .then(res => this.props.post_comment_success(res.data))
      .then(() => this.add_comments_to_state(this.props.db_comments))
      .catch(function (error) {
          console.log(error);
        });
    this.setCurUserID();
    this.handleTransition();
  }

  setCurUserID = () => {
    if(this.props.isAuthenticated) {
      this.setState({cur_user_id: this.props.db_profile[0].uid})
    }
  }

  handleTransition = () => (
    setTimeout(() => this.setState({opacity: 1}), 400 )
  )

  add_comments_to_state = (comments) => {
    this.setState({ comments_arr: [...comments]})
    this.animate_comments();
  }

  animate_comments = () => {
    let i = 1
    this.state.comments_arr.map(comment => {  // eslint-disable-line
      setTimeout(() => { this.setState({comments_motion: [...this.state.comments_motion, comment]}) }, 400 * i );
      i++;
    })
  }

  handleClickOpen = (cid, comment) => {
     this.setState({ open: true, comment: comment, cid: cid });
   };

   handleClose = () => {
     this.setState({ open: false, comment: '', cid: '' });
   };

   handleCommentChange = (event) => {
     this.setState({comment: event.target.value})
   };

   handleCommentSubmit = (submitted_comment) => {
      this.setState({comments_motion: [submitted_comment, ...this.state.comments_motion]})
   };

   handleCommentUpdate = (comment) => {
     const commentIndex = this.state.comments_motion.findIndex(com => com.cid === comment.cid)
     let newArr = [...this.state.comments_motion]
     newArr[commentIndex] = comment
     this.setState({comments_motion: newArr })
   };

   handleCommentDelete = (cid) => {
     const newArr = this.state.comments_motion.filter(com => com.cid !== cid)
     this.setState({comments_motion: newArr})
   };


  handleSubmit = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    const user_id = this.props.db_profile[0].uid
    const post_id = this.props.location.state.post.post.pid
    const username = this.props.db_profile[0].username
    const current_time = "Just Now"
    const temp_cid = 63426

    const submitted_comment = {cid: temp_cid, comment: comment, user_id: user_id, author: username, date_created: current_time }
    const data = {comment: comment, post_id: post_id, user_id: user_id, username: username}

    axios.post('api/post/commenttodb', data)
      .then(res => console.log(res))
      .catch(function (error) {
        console.log(error);
      })
     this.handleCommentSubmit(submitted_comment)
   };

   handleUpdate = () => {
     const comment = this.state.comment
     const cid = this.state.cid
     const user_id = this.props.db_profile[0].uid
     const post_id = this.props.location.state.post.post.pid
     const username = this.props.db_profile[0].username
     const isEdited = true
     const current_time = "Just Now"

     const edited_comment = {cid: cid, comment: comment, user_id: user_id, author: username, date_created: current_time, isEdited: isEdited}
     const data = {cid: cid, comment: comment, post_id: post_id, user_id: user_id, username: username}

     axios.put('api/put/commenttodb', data)
       .then(res => console.log(res))
       .catch(function (error) {
         console.log(error);
       })
      this.handleCommentUpdate(edited_comment);
    };

   handleDelete = () => {
     const cid = this.state.cid
     axios.delete('api/delete/comment', { data: { cid: cid }})
       .then(res => console.log(res))
       .catch(function (error) {
         console.log(error);
       })
      this.handleCommentDelete(cid);
    };

    handleLikes = () => {
      const user_id = this.props.db_profile[0].uid
      const data = { uid: user_id }
      axios.put('/api/put/likes', data)
        .then( !this.state.like_user_ids.includes(user_id) && this.state.like_post ? this.setState({likes: this.state.likes + 1}) : null)
        .then(this.setState({like_post: false}))
        .catch(function (error) {
          console.log(error);
        })
    };

   RenderComments = (props) => (
     <div>
        <h3>{props.comment.comment}</h3>
        <small>
        { props.comment.date_created === 'Just Now'
          ?  <span> {props.comment.isEdited ? <span> Edited </span> : <span> Just Now </span> }</span>
          :  moment(props.comment.date_created).format('MMMM Do, YY | h:mm a')
        }
        </small>

        <p> By: {props.comment.author} </p>
        { this.state.cur_user_id === props.comment.user_id
          ? <Button color="secondary" onClick={() => this.handleClickOpen(props.comment.cid, props.comment.comment) } > Edit </Button>
          : null
        }
    </div>
    );



 render() {
   return (
    <article>
      <div style={{opacity: this.state.opacity, transition: "opacity 2s ease" }}>
        <h2> Post </h2>
          <h4>{this.props.location.state.post.post.title}</h4>
          <p>{this.props.location.state.post.post.body}</p>
          <p> By: {this.props.location.state.post.post.author}</p>
          <a style={{cursor: 'pointer'}} onClick={this.props.isAuthenticated ? () => this.handleLikes() : () => history.replace('/signup')}>
            <i className="material-icons">thumb_up</i>
            <small className="notification-num-showpost"> {this.state.likes} </small>
          </a>
        <h4> Comments: </h4>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="comment"
            label="Comment"
            margin="normal"
          />
          <br/>
          { this.props.isAuthenticated
               ? <Button variant="contained" color="primary" type="submit" >Submit</Button>
               : <Link to="/signup">
                    <Button  variant="contained" color="primary">
                        Signup to Comment
                     </Button>
                  </Link>
              }
        </form>
        <br />
        <button className="CancelButton" onClick={() => history.goBack()} > Cancel </button>
        <br />
        <hr />
      </div>
        <div>
          { this.state.comments_arr
           ? <Transition
              keys={this.state.comments_motion.map(com => com.cid)}
              from={{  opacity: 0, transition: "opacity .25s ease" }}
              enter={{ opacity: 1, transition: "opacity .25s ease" }}
              leave={{ opacity: 0}}
             >
              { this.state.comments_motion.map(comment => styles =>
                <animated.div style={{...defaultStyles, ...styles}}>
                  <this.RenderComments key={ comment.cid } cur_user_id={ this.props.db_profile[0].uid } comment={comment} />
                   <br />
                </animated.div>
                )}
              </Transition>
            : null
          }
        </div>
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> Edit Comment </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <input type="text" value={this.state.comment} onChange={ this.handleCommentChange} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.handleUpdate(); this.handleClose()}} color="primary" autoFocus>
              Update
            </Button>
            <Button onClick={() => {this.handleDelete(); this.handleClose()}} color="primary">
              Delete
            </Button>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
  </article>
  )}
}



function mapStateToProps(state) {
  return {
      db_profile: state.auth_reducer.DBUserProfile,
      db_comments: state.posts_reducer.db_comments,
      isAuthenticated: state.auth_reducer.isAuthenticated
  };
}

function mapDispatchToProps (dispatch) {
  return {
    post_comment_success: (comments) => dispatch(ACTIONS.get_db_post_comments(comments))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
