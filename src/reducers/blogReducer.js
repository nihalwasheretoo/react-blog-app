import { FETCH_BLOGS, ADD_BLOG, DELETE_BLOG } from "../actions/types";

const R = require("ramda");

const initialState = {
  blogs: [],
  blog: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BLOG:
      return {
        ...state,
        blog: action.payload.newBlog,
        blogs: [...state.blogs, action.payload.newBlog]
      };

    case FETCH_BLOGS:
      return {
        ...state,
        blogs: R.concat(state.blogs, action.payload.blogs)
      };

    case DELETE_BLOG: {
      const index = state.blogs.findIndex(x => x.id === action.payload.id);
      state.blogs.splice(index, 1);
      return {
        ...state,
        blogs: [...state.blogs]
      };
    }

    default:
      return state;
  }
}
