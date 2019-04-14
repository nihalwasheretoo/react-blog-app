import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import { Provider } from "react-redux";
import BlogContainer from "./BlogContainer";
import About from "./About";
import Landing from "./Landing";
import AuthCallback from "./AuthCallback";
import store from "../store";

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/:user" component={BlogContainer} />
            <Route exact path="/auth" component={AuthCallback} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default AppContainer;
