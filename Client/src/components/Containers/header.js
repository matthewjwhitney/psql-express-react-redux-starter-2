import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ASYNC_ACTIONS from '../../store/actions/actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import './Container_Styles/header_styles.css';



class Header extends Component {
    constructor() {
      super()
      this.handleOpen = this.handleOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.handleMenu = this.handleMenu.bind(this)
      this.desktopNav = this.desktopNav.bind(this)
      this.mobileNav = this.mobileNav.bind(this)
    }

    componentDidMount() {
      this.setState({width: window.innerWidth})
    }

    state = {
      isOpen: false,
      anchorEl: null,
      width: 0
    };


    handleOpen = () => {
      this.setState({ isOpen: true });
    };

    handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget, isOpen: true })
    }

    handleClose = () => {
      this.setState({ isOpen: false, anchorEl:null });
    };

    mobileNav = () => {
      const isOpen = this.state.isOpen
      const anchorEl = this.state.anchorEl
      const open = Boolean(isOpen)

      return(
      <div className="FlexRow">
        <AppBar postion="static">
          <Toolbar>
            <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="primary"
                  aria-label="Menu">
              <span style={{ color: 'white'}}><MenuIcon /></span>
            </IconButton>
           <Menu
                 id='menu-appbar'
                 anchorEl={anchorEl}
                 anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'left',
                   }}
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'left',
                   }}
                   open={open}
                   onClose={() => this.handleClose()}>


             <Link to="/" style={{ textDecoration: 'none' }}>
               <MenuItem button={true} onClick={() => this.handleClose()}>
                 Home
               </MenuItem>
             </Link>

              <Link to="/posts" style={{ textDecoration: 'none' }}>
               <MenuItem button={true} onClick={() => this.handleClose()}>
                 Forum
               </MenuItem>
              </Link>

              <Link to="/profile" style={{ textDecoration: 'none' }}>
               <MenuItem button={true} onClick={() => this.handleClose()}>
                 Account
               </MenuItem>
              </Link>

             </Menu>
               <div style={{marginLeft: 'auto'}}>
               {!this.props.isFetchingAuth
                 ? (!this.props.isAuthenticated
                      ? <Button variant="contained" color="primary" onClick={() => this.props.auth.login()}>
                           <span style={{paddingRight: '5px'}}>Login</span> | <span style={{paddingLeft: '5px'}}>Signup</span> </Button>
                      : <Button variant="contained" color="primary" onClick={() => this.props.auth.logout()}> Logout </Button>
                    )
                 : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                }
               </div>
             </Toolbar>
           </AppBar>
        </div>
      )
    }

    desktopNav = () => {
      const isOpen = this.state.isOpen
      const anchorEl = this.state.anchorEl
      const open = Boolean(isOpen)

      return(
      <div className="FlexRow">
        <AppBar postion="static">
          <Toolbar>
            <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="primary"
                  aria-label="Menu">
              <span style={{ marginTop: 5, marginLeft: -12, marginRight: 20, color: 'white'}}><MenuIcon /></span>
            </IconButton>
          <Typography align="left"  variant="display1" >
           <span style={{color:'white'}}> React Redux App </span>
           </Typography>
           <Menu
                 id='menu-appbar'
                 anchorEl={anchorEl}
                 anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'left',
                   }}
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'left',
                   }}
                   open={open}
                   onClose={() => this.handleClose()}>


             <Link to="/" style={{ textDecoration: 'none' }}>
               <MenuItem button={true} onClick={() => this.handleClose()}>
                 Home
               </MenuItem>
             </Link>

              <Link to="/posts" style={{ textDecoration: 'none' }}>
               <MenuItem button={true} onClick={() => this.handleClose()}>
                 Forum
               </MenuItem>
              </Link>

              <Link to="/profile" style={{ textDecoration: 'none' }}>
               <MenuItem button={true} onClick={() => this.handleClose()}>
                 Account
               </MenuItem>
              </Link>


             </Menu>
               <div style={{marginLeft: 'auto'}}>
               {!this.props.isFetchingAuth
                 ? (!this.props.isAuthenticated
                      ? <Button variant="contained" color="primary" onClick={() => this.props.auth.login()}>
                           <span style={{paddingRight: '5px'}}>Login</span> | <span style={{paddingLeft: '5px'}}>Signup</span> </Button>
                      : <Button variant="contained" color="primary" onClick={() => this.props.auth.logout()}> Logout </Button>
                    )
                 : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                }
               </div>
             </Toolbar>
           </AppBar>
        </div>
      )
    }



 render() {
    return (
      <div>
      { this.state.width > 750
        ? <this.desktopNav />
        : <this.mobileNav />
      }
      </div>
    )}
}


function mapStateToProps(state) {
  return {
      isAuthenticated: state.auth_reducer.isAuthenticated,
      isFetchingAuth: state.auth_reducer.isFetchingAuth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    start_auth: () => dispatch(ASYNC_ACTIONS.is_fetching_auth()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
