import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as ASYNC_ACTIONS from '../store/actions/actions';
import history from './history';
import axios from './axios_instance';




class AuthCheck extends Component {
  constructor() {
    super()
    this.send_profile_to_db = this.send_profile_to_db.bind(this)
  }

   send_profile_to_db (profile) {
    const data = profile
    axios.post('api/post/userprofiletodb', data)
    .then(() => axios.get('api/get/userprofilefromdb', {params: {email: profile.profile.email}} )
      .then(res => this.props.db_profile_success(res.data))
      .then(history.replace('/')))
   }

  componentDidMount() {
    if(this.props.auth.isAuthenticated()) {
      this.props.login_success()
      this.props.profile_success(this.props.auth.userProfile)
      this.send_profile_to_db(this.props.auth.userProfile)
      this.props.remove_is_fetching_auth()
    } else {
      this.props.login_failure()
      this.props.profile_failure()
      this.props.db_profile_failure()
      history.replace('/')
    }
  }

   render() {
    return (
        <div>
       </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    db_profile: state.auth_reducer.DBUserProfile
  }
}



function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(ASYNC_ACTIONS.login_success()),
    login_failure: () => dispatch(ASYNC_ACTIONS.login_failure()),
    profile_success: (profile) => dispatch(ASYNC_ACTIONS.get_profile(profile)),
    profile_failure: () => dispatch(ASYNC_ACTIONS.remove_profile()),
    db_profile_success: (profile) => dispatch(ASYNC_ACTIONS.set_db_profile(profile)),
    db_profile_failure: () => dispatch(ASYNC_ACTIONS.remove_db_profile()),
    remove_is_fetching_auth: () => dispatch(ASYNC_ACTIONS.remove_is_fetching_auth())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);
