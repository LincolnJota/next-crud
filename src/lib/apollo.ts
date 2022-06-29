import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.graphCmsENDPOINT,
  headers: {
    'Authorization': `Bearer ${process.env.graphCmsTOKEN}`,
  },
  cache: new InMemoryCache(),
});