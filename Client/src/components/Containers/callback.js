import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ACTION_TYPES from '../../store/actions/action_types'; // eslint-disable-line
import * as ASYNC_ACTIONS from '../../store/actions/actions';

import { BounceLoader } from 'react-spinners';
import './Container_Styles/callback_styles.css';


class Callback extends Component {
  componentWillMount() {
    this.props.is_fetching_auth();
  }

  render() {
    return(
      <div className="FlexCallback">
        <BounceLoader
            sizeUnit={"px"}
            size={ 250 }
        />
      </div>
    )}
}


function mapStateToProps(state) {
  return {
      isAuthenticated: state.auth_reducer.isAuthenticated
  }
}

function mapDispatchToProps (dispatch) {
  return {
    is_fetching_auth: () => dispatch(ASYNC_ACTIONS.is_fetching_auth()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
