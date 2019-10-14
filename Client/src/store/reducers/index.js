import { combineReducers } from 'redux';
import Auth_Reducer from './auth_reducer';
import Posts_Reducer from './posts_reducer';

const rootReducer = combineReducers({
  auth_reducer: Auth_Reducer,
  posts_reducer: Posts_Reducer,
})

export default rootReducer;
