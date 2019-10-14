import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as ACTIONS from '../../store/actions/actions';

import axios from '../../utils/axios_instance';
import history from '../../utils/history';

import { Transition  } from 'react-spring';
import { animated } from 'react-spring';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import './Profile_Styles/profile_styles.css';


const defaultStyles = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '10px'
}



class Profile extends Component {
  constructor() {
    super()
    this.add_posts_to_state = this.add_posts_to_state.bind(this)
    this.state = {
         open: false,
         post_id: null,
         posts: [],
         posts_motion: [],
         opacity: 0,
         user_id: null,
         screen_size: null,
         card_width: 0,
         card_height: 0,
         side_drawer_open: false
       }
  }

  componentDidMount() {
    this.setState({screen_size: window.innerWidth})
    this.handleTransition();
    const userid = this.props.db_profile[0].uid
    this.handleUserId(userid);
    axios.get('api/get/userposts', {params: {userid: userid}})
      .then(res =>  this.props.db_posts_success(res.data))
      .then(() => this.add_posts_to_state(this.props.dbposts))
      .catch(function (error) {
          console.log(error);
        })
    this.setCardSize();
   }

  setCardSize = () => {
     if(window.innerWidth < 750) {
       this.setState({card_width: 400, card_height: 250})
     } else {
       this.setState({card_width: 500, card_height: 250})
     }
   }

  handleTransition = () => (
    this.setState({opacity: 1})
  )

  handleUserId = (userid) => (
    this.setState({user_id: userid})
  )

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, post_id: null });
  };

  handleDrawerOpen = () => {
    this.setState({ side_drawer_open: true });
  };

  handleDrawerClose = () => {
    this.setState({ side_drawer_open: false});
  };

  add_posts_to_state = (posts) => {
    this.setState({posts: [...posts]})
    this.animate_posts()
  }

  animate_posts = () => {
    let i = 1
    this.state.posts.map(post => { // eslint-disable-line
      setTimeout(() => { this.setState({posts_motion: [...this.state.posts_motion, post]}) }, 400 * i );
      i++;
    })
  }


 RenderMobileProfile = (props) => (
  <div className="FlexColumn">
   <div className="FlexRow">
    <div className="FlexPostButton">
     <Button variant="contained" color="primary"onClick={() => this.handleDrawerOpen()}> Account </Button>
     </div>
    </div>
     <div className="FlexProfileHeader">
       <div style={{opacity: this.state.opacity, transition: "opacity 3s ease" }}>
         <Typography align='center' variant="display1"> <span style={{textAlign: 'center'}}> My Posts</span> </Typography>
       </div>
       <div className="FlexProfileColumn">
       { this.state.posts ?
         <Transition
           keys={this.state.posts_motion.map(post => post.pid)}
           from={{ opacity: 0, height: 0, width: 0 }}
           enter={{ opacity: 1, height: this.state.card_height, width: this.state.card_height }}
           leave={{ opacity: 0, height: 0 }}
         >
            { this.state.posts.map(post  => styles =>
                     <animated.div style={{...defaultStyles, ...styles}}>
                       <this.RenderPosts key={ post.pid } post={post} />
                        <br />
                     </animated.div>
                   )}
         </Transition>
       : null
       }
     </div>
    </div>
     <Drawer open={this.state.side_drawer_open} onClose={() => this.handleDrawerClose()}>
      <div className="ProfileDrawerRow">
           {props.profile.profile.nickname}
      </div>
      <Divider />
      <div className="ProfileDrawerRow">
         <img src={props.profile.profile.picture} alt="" />
      </div>
      <Divider />
      <div className="ProfileDrawerRow">
           { props.profile.profile.email }
        </div>
      <Divider />
      <div className="ProfileDrawerRow">
           { props.profile.profile.name }
        </div>
      <Divider />
      <div className="ProfileDrawerRow">
      <p className="MobileDrawerText"> Email Verified: </p>
        { props.profile.profile.email_verified ? <span>Yes</span> : <span> No</span> }
        </div>
      <Divider />
      <div className="ProfileDrawerRow">
       <Link to={{pathname:"/showmessages/" + this.state.user_id }}>
           <Button variant="contained" color="primary" type="submit">
              Show Messages
           </Button>
        </Link>
        </div>
    </Drawer>
   </div>
 )

 RenderDesktopProfile = (props) => (
   <div className="FlexRow">
    <div className="FlexColumn">
      <div className="Displaybox">
       <div className="ProfileDrawerRow">
         <h1>Welcome:
         <br />
            {props.profile.profile.nickname}
         </h1>
       </div>

       <hr className="style-one" />
         <div className="ProfileDrawerRow">
          <img src={props.profile.profile.picture} alt="" />
         </div>

       <hr className="style-one" />
         <div className="ProfileDrawerRow">
          <h4> Email:
          <br />
            { props.profile.profile.email }
           </h4>
        </div>

       <hr className="style-one" />
        <div className="ProfileDrawerRow" >
          <h4> Name:
            <br />
            { props.profile.profile.name }
          </h4>
       </div>

       <hr className="style-one" />
       <div className="ProfileDrawerRow">
        <h4> Email Verified: { props.profile.profile.email_verified ? <p>Yes</p> : <p> No</p> } </h4>
      </div>

      <div>
        <Link to={{pathname:"/showmessages/" + this.state.user_id }}>
            <Button variant="contained" color="primary" type="submit">
               Show Messages
            </Button>
         </Link>
       </div>
      </div>
      </div>
    <div className="FlexColumn">
    <div className="FlexProfileHeader">
      <div style={{opacity: this.state.opacity, transition: "opacity 3s ease" }}>
        <Typography align='center' variant="display1"> <span style={{textAlign: 'center'}}> My Posts</span> </Typography>
      </div>
      <div className="FlexProfileColumn">
      { this.state.posts ?
        <Transition
          keys={this.state.posts_motion.map(post => post.pid)}
          from={{ opacity: 0, height: 0, width: 0 }}
          enter={{ opacity: 1, height: this.state.card_height, width: this.state.card_height }}
          leave={{ opacity: 0, height: 0 }}
        >
           { this.state.posts.map(post  => styles =>
                    <animated.div style={{...defaultStyles, ...styles}}>
                      <this.RenderPosts key={ post.pid } post={post} />
                       <br />
                    </animated.div>
                  )}
        </Transition>
      : null
      }
    </div>
   </div>
  </div>
</div>
  );


  RenderPosts = (post) => (
  <div>
    <Card className="CardStyles">
        <CardHeader
          title={<Link to={{pathname:"/post/" + post.post.pid, state:{post} }}>{ post.post.title }</Link>}
          subheader={
                    <div>
                      <div>{ post.post.date_created }</div>
                      <div>
                          <button className="EditButtonProfile"><Link to={{pathname:"/editpost/" + post.post.pid, state:{post} }}>Edit</Link></button>
                          <button className="DeleteButtonProfile" onClick={() => this.setState({open: true, post_id: post.post.pid})}>Delete</button>
                      </div>
                    </div> }
        />
        <hr className="style-two" />
        <CardContent>
            <span style={{ overflow: 'hidden'}}>{ post.post.body } </span>
        </CardContent>
      </Card>
    </div>
  )



   DeletePost = () => {
     const post_id = this.state.post_id
     axios.delete('api/delete/postcomments', { data: { post_id: post_id }})
     .then(() =>{ axios.delete('api/delete/post', { data: { post_id: post_id }})
        .then(res => console.log(res))  })
     .catch(function (error) {
         console.log(error);
       })
     .then(() => this.handleClose())
     .then(() => setTimeout( function() { history.replace('/') }, 700))
   }



 render() {
    return (
   <div>
      <div>
      { this.state.screen_size > 750
        ?  <this.RenderDesktopProfile profile={this.props.profile} />
        :  <this.RenderMobileProfile profile={this.props.profile} />
      }
      </div>
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> Confirm Delete? </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleteing Post
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.DeletePost()} color="primary" autoFocus>
              Agree
            </Button>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    )}
}



function mapStateToProps(state) {
    return {
        profile: state.auth_reducer.UserProfile,
        db_profile: state.auth_reducer.DBUserProfile,
        dbposts: state.posts_reducer.db_posts
    };
}

function mapDispatchToProps (dispatch) {
  return {
    profile_success: (profile) => dispatch(ACTIONS.get_profile(profile)),
    db_posts_success: (posts) => dispatch(ACTIONS.get_db_posts(posts))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
