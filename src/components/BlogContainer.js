import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddBlog from "./AddBlog";
import Blogs from "./Blogs";
import Auth from "./Auth";
import { getBlogs, deleteSingleBlog } from "../actions/blog";

const auth = new Auth();
class BlogContainer extends Component {
  componentDidMount() {
    // const email = localStorage.getItem("Auth0->email");

    // if (email) {
    //   this.props.getBlogs(email);
    // }
    console.log("url : ", this.props.match.params);
    this.props.getBlogs("test");
  }

  handleLogout() {
    auth.logout();
  }

  handleLogin() {
    auth.login();
  }

  handleDeleteBlog(id) {
    // const email = localStorage.getItem("Auth0->email");
    const email = "test";
    this.props.deleteSingleBlog(id, email);
  }
  render() {
    const { isAuthenticated } = auth;
    // if (isAuthenticated()) {
    return (
      <div>
        <Button color="default" onClick={this.handleLogout.bind(this)}>
          LOGOUT
        </Button>
        <AddBlog />
        <Blogs
          blog={this.props.blog.blogs}
          onDelete={this.handleDeleteBlog.bind(this)}
        />
      </div>
    );
    // } else {
    //   return (
    //     <div>
    //       <Button color="primary" onClick={this.handleLogin.bind(this)}>
    //         LOGIN
    //       </Button>
    //     </div>
    //   );
  }
}
// }

BlogContainer.propTypes = {
  getBlogs: PropTypes.func.isRequired,
  deleteSingleBlog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(
  mapStateToProps,
  { getBlogs, deleteSingleBlog }
)(BlogContainer);
