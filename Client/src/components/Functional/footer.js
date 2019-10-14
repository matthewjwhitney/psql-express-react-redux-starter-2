import React, { Component} from 'react';
import './Functional_Styles/footer_styles.css';



class FooterMain extends Component {
  constructor() {
    super()
    this.desktopFooter = this.desktopFooter.bind(this)
    this.mobileFooter = this.mobileFooter.bind(this)
  }

  componentDidMount() {
    this.setState({height: 50 - window.innerHeight })
    this.setState({width: window.innerWidth})

  }

  state = {
    width: 0,
    height: 0
  };


  desktopFooter = () => (
    <div className="FooterMobile">
      Footer
    </div>
  );

  mobileFooter = () => (
    <div className="FooterMobile">
    </div>
  )

  render() {
    return(
    <div>
      {this.state.width < 750
        ? <this.mobileFooter />
        : <this.desktopFooter />
      }
      </div>
    )}
}

export default FooterMain;
