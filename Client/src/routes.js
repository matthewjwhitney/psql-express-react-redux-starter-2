import React, { Component } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router';
import { connect } from 'react-redux';
import './App.css';

import * as ACTION_TYPES from './store/actions/action_types'; // eslint-disable-line
import * as ASYNC_ACTIONS from './store/actions/actions';

import history from './utils/history';
import Auth from './utils/auth';
import AuthCheck from './utils/authcheck';

import SignUp from './components/Functional/signup';

import Header from './components/Containers/header';
import Home from './components/Containers/home';
import Callback from './components/Containers/callback';

import Posts from './components/Blog/posts';
import ShowPost from './components/Blog/showpost';
import AddPost from './components/Blog/addpost';
import EditPost from './components/Blog/editpost';

import Profile from './components/Profile/profile';
import ShowUser from './components/Profile/showuser';
import SendMessage from './components/Profile/sendmessage';
import ShowMessages from './components/Profile/showmessages';
import ReplytoMessage from './components/Profile/replytomessage';




export const auth = new Auth();

//Function for automatically handling authentication
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

//Higher Order Component for route protection. Requires authentication to render component.
const PrivateRoute = ({ component: Component, auth, authed, ...rest }) => (
  <Route {...rest}
   render={props => authed === true
     ? <Component auth={auth} {...props} />
     : <Redirect to={{pathname: "/signup"}} />
    }
  />
);



class Routes extends Component {
  componentDidMount() {
    if(auth.isAuthenticated()) {
      this.props.login_success()
    } else if (!auth.isAuthenticated()) {
      this.props.login_failure()
      }
    }

  render() {
    return(
      <Router history={history}>
       <div>
          <Header auth={auth} authed={this.props.isAuthenticated}/>
          <div className="FlexRowMain">
                <Switch>
                  {/* Public unprotected routes*/ }
                  <Route exact path='/' component={ Home } />
                  <Route path="/authcheck" render={(props) => <AuthCheck auth={auth} {...props} />} />
                  <Route path="/user/:name" component={ ShowUser } />
                  <Route path="/signup" render={(props) => <SignUp auth={auth} {...props} />} />

                  {/* Alternate method for rendering */}
                  <Route path="/posts" component={ Posts } />
                  <Route path="/post/:id" component={ ShowPost } />
                  <Route path='/editpost/:id' component={ EditPost } />
                  <Route path="/newpost" component={ AddPost } />

                  {/* Route for automatically handling authentication and callback */}
                  <Route path="/callback" render={(props) => {handleAuthentication(props); return <Callback {...props} /> }}/>

                  {/* Pattern for non-public routes. Use in exact same way for more components requiring isAuthenticated */}
                  <PrivateRoute path="/profile"  auth={auth} authed={auth.isAuthenticated()} component={ Profile } />
                  <PrivateRoute path="/sendmessage"  auth={auth} authed={auth.isAuthenticated()} component={ SendMessage } />
                  <PrivateRoute path="/showmessages/:id"  auth={auth} authed={auth.isAuthenticated()} component={ ShowMessages } />
                  <PrivateRoute path="/replytomessage"  auth={auth} authed={auth.isAuthenticated()} component={ ReplytoMessage } />
                </Switch>
            </div>
        </div>
      </Router>
   )}
}


function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth_reducer.isAuthenticated
    }
}

function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(ASYNC_ACTIONS.login_success()),
    login_failure:  () => dispatch(ASYNC_ACTIONS.login_failure())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Routes);
