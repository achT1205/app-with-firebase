import React, { Component } from "react";
import {
  Footer,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { withNamespaces } from 'react-i18next';
import Routes from "./Routes";
import Header from './components/common/header'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (lng) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  render() {
    return (
      <Router>
        <div className="flyout">
          <Header handleChange = {this.handleChange}/>
          <main style={{ marginTop: "4rem" }}>
            <Routes />
          </main>

          <Footer color="indigo">
            <p className="footer-copyright mb-0 py-3 text-center">
              <a href="/"> letsdeal.com </a>
            </p>
          </Footer>
        </div>
      </Router>
    );
  }
}
export default withNamespaces('translation')(App);