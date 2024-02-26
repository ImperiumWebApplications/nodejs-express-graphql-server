const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const axios = require("axios");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Todo {
    userId: Int
    id: Int
    title: String
    completed: Boolean
  }

  type Query {
    todos: [Todo]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  todos: async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);

console.log("Running a GraphQL API server at http://localhost:4000/graphql");
