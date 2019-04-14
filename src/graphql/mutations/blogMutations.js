import gql from "graphql-tag";

const { client } = require("../config");

export async function addBlogMutation(blog, email) {
  await client
    .mutate({
      mutation: gql`
        mutation insert_blog {
          insert_blog(
            objects: [
              {
                id: "${blog.id}"
                title: "${blog.title}"
                description: "${blog.description}"
                category: "${blog.category}"
                author: "${email}"
              }
            ]
          ) {
            returning {
              id
              title
              description
              category
              author
            }
          }
        }
      `
    })
    .then(data => data)
    .catch(error => error);
}

export async function deleteBlogMutation(id, email) {
  await client
    .mutate({
      mutation: gql`
        mutation delete_blog {
          delete_blog(
            where: { _and: [{ id: { _eq: ${id} } }, { author: { _eq: "${email}" } }] }
          ) {
            affected_rows
          }
        }
      `
    })
    .then(data => data)
    .catch(error => error);
}
