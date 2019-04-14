import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32
  }
});
class BlogItem extends Component {
  deleteBlog(id) {
    this.props.onDelete(id);
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container justify="center" spacing={24}>
          <Grid item>
            <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" component="h3">
                Title : {this.props.blog.title}
              </Typography>
              <Typography component="p">
                Description : {this.props.blog.description}
              </Typography>
              <Typography component="p">
                Category : {this.props.blog.category}
              </Typography>
              <DeleteIcon
                className={classes.icon}
                onClick={this.deleteBlog.bind(this, this.props.blog.id)}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

BlogItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BlogItem);
