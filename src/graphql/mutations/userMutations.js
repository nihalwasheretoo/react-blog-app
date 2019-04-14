import gql from "graphql-tag";

const uuidv4 = require("uuid/v4");
const { client } = require("../config");

export async function insertUserMutation(email) {
  await client
    .mutate({
      mutation: gql`
         mutation insert_user {
             insert_user(
               objects: [
                 {
                   id: "${uuidv4()}",
                   email: "${email}",
                 }
               ]
             ) {
               returning {
                 email
               }
             }
           }
        `
    })
    .then(data => data)
    .catch(error => error);
}
