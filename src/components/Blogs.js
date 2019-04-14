import React, { Component } from "react";
import BlogItem from "./BlogItem";

class Blogs extends Component {
  deleteBlog(id) {
    this.props.onDelete(id);
  }
  render() {
    let blogItems;
    if (this.props.blog) {
      blogItems = this.props.blog.map(blog => {
        return (
          <BlogItem
            onDelete={this.deleteBlog.bind(this)}
            key={blog.id}
            blog={blog}
          />
        );
      });
    }

    return (
      <div className="Blogs">
        <h3>List of Blogs</h3>
        {blogItems}
      </div>
    );
  }
}

export default Blogs;
