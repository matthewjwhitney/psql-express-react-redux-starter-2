import * as ACTION_TYPES from './action_types';

/*eslint-disable */


// Simple Middleware redux thunk async actions


//Async actions to handle authentication state
export function login_success() {
  return dispatch => {
      dispatch({type: ACTION_TYPES.LOGIN_SUCCESS})
  }
}

export function login_failure() {
  return dispatch => {
    dispatch({type: ACTION_TYPES.LOGIN_FAILURE})
  }
}

export function is_fetching_auth() {
  return dispatch => {
    dispatch({type: ACTION_TYPES.IS_FETCHING_AUTH})
  }
}

export function remove_is_fetching_auth() {
  return dispatch => {
    dispatch({type: ACTION_TYPES.REMOVE_IS_FETCHING_AUTH})
  }
}


//Actions for  getting profile
export function get_profile(profile) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.GET_PROFILE, payload: profile})
  }
}

export function remove_profile() {
  return dispatch => {
      return dispatch({type: ACTION_TYPES.REMOVE_PROFILE})
  }
}


//Set profile in store from sql db
export function set_db_profile(profile) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.SET_DB_PROFILE, payload: profile})
  }
}

export function remove_db_profile() {
  return dispatch => {
      return dispatch({type: ACTION_TYPES.REMOVE_DB_PROFILE})
  }
}


//Get posts from the db based on user id
export function get_db_posts(posts) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.FETCH_DB_POSTS_SUCCESS, payload: posts})
  }
}

export function remove_db_posts() {
  return dispatch => {
      return dispatch({type: ACTION_TYPES.REMOVE_DB_POSTS})
  }
}


//Get comments for one post
export function get_db_post_comments(comments) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.FETCH_DB_POST_COMMENTS_SUCCESS, payload: comments})
  }
}

export function remove_db_post_comments() {
  return dispatch => {
      return dispatch({type: ACTION_TYPES.DB_POST_COMMENTS_FAILURE})
  }
}


//Results for db posts search query
export function get_search_posts(posts) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.SEARCH_POSTS_SUCCESS, payload: posts})
  }
}

export function remove_search_posts() {
  return dispatch => {
      return dispatch({type: ACTION_TYPES.SEARCH_POSTS_FAILURE})
  }
}





//Get posts from the db based on user id of another user
export function get_other_user_db_posts(posts) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.FETCH_OTHER_USER_DB_POSTS_SUCCESS, payload: posts})
  }
}

export function remove_other_user_db_posts() {
  return dispatch => {
      return dispatch({type: ACTION_TYPES.REMOVE_OTHER_USER_DB_POSTS})
  }
}


//Actions for rendering profile info of another user
export function set_other_user_db_profile(profile) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.SET_OTHER_USER_DB_PROFILE, payload: profile})
  }
}

export function remove_other_user_db_profile() {
  return dispatch => {
      return dispatch({type: ACTION_TYPES.REMOVE_OTHER_USER_DB_PROFILE})
  }
}

//Actions for setting users messages
export function set_user_messages(messages) {
  return dispatch => {
    dispatch({type: ACTION_TYPES.SET_USER_MESSAGES, payload: messages})
  }
}

export function remove_user_messages() {
  return dispatch => {
      return dispatch({type: ACTION_TYPES.REMOVE_USER_MESSAGES})
  }
}
