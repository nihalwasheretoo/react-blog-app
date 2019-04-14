import gql from "graphql-tag";

const { client } = require("../config");

export async function fetchBlogs(email) {
  const { data } = await client
    .query({
      query: gql`
        query {
          blog(where: { author: { _eq: "${email}" } }) {
            id
            title
            description
            category
            author
          }
        }
      `
    })
    .then(data => data)
    .catch(error => error);

  return data.blog;
}
