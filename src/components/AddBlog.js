import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBlog } from "../actions/blog";

const uuidv4 = require("uuid/v4");

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class AddBlog extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      title: "",
      description: "",
      category: "",
      author: "test"
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    if (!this.state.title) {
      alert("Please enter a title!");
    } else {
      const newBlog = {
        // id: uuidv4(),
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        category: this.state.category,
        author: this.state.author
      };

      this.props.addBlog(newBlog);
    }

    e.preventDefault();
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="AddBlog">
        <h3>Add Blog</h3>
        <Grid container justify="center" spacing={24}>
          <Grid item>
            <TextField
              label="Id"
              name="id"
              className={classes.textField}
              value={this.state.id}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Title"
              name="title"
              className={classes.textField}
              value={this.state.title}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Description"
              name="description"
              className={classes.textField}
              value={this.state.description}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Category"
              name="category"
              value={this.state.category}
              onChange={this.onChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSubmit.bind(this)}
        >
          ADD BLOG
        </Button>
      </div>
    );
  }
}

AddBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(
  mapStateToProps,
  { addBlog }
)(withStyles(styles)(AddBlog));
