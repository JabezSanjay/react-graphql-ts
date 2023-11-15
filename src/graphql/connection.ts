import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || "";
const HASURA_ADMIN_SECRET = process.env.REACT_APP_HASURA_ADMIN_SECRET || "";

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
  cache: cache,
});

export default client;
