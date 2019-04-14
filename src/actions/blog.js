import Auth from "../components/Auth";
import { FETCH_BLOGS, ADD_BLOG, DELETE_BLOG } from "./types";

const { fetchBlogs } = require("../graphql/queries/blogQueries");
const {
  addBlogMutation,
  deleteBlogMutation
} = require("../graphql/mutations/blogMutations");

const auth = new Auth();

export const getBlogs = email => async dispatch => {
  // fetch blogs from database
  const blogs = await fetchBlogs(email);
  dispatch({
    type: FETCH_BLOGS,
    payload: { blogs }
  });
};

export const addBlog = newBlog => async dispatch => {
  // const email = localStorage.getItem("Auth0->email");
  const email = "test";
  // add blog to database
  await addBlogMutation(newBlog, email);
  dispatch({
    type: ADD_BLOG,
    payload: { newBlog }
  });
};

export const deleteSingleBlog = (id, email) => async dispatch => {
  // delete blog from database
  await deleteBlogMutation(id, email);
  dispatch({
    type: DELETE_BLOG,
    payload: { id }
  });
};

export const authCall = () => async => {
  // handle Auth0 API integration
  auth.handleAuth();
};
