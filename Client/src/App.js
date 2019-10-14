import React, { Component } from 'react';
import Routes from './routes';
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import FooterMain from './components/Functional/footer';



const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
  status: {
    danger: red,
  },
});



class App extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider theme={theme}>
            <Routes />
            <FooterMain />
      </MuiThemeProvider>
      </div>
    )}
}


export default App;
