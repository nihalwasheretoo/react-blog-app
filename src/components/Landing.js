import React, { Component } from "react";

export default class Landing extends Component {
  componentDidMount() {
    const user = "test";
    window.location.href = `/${user}`;
  }
  render() {
    return (
      <div>
        <h1>Landing Page...</h1>
      </div>
    );
  }
}
