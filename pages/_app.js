import ApolloClient from "apollo-client"
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/client'

import '../components/layout/layout.scss'

// const API_URL = "https://pik-server.herokuapp.com/graphql/"
const API_URL = "http://localhost:3000/graphql/"

const client = new ApolloClient({
  link: createHttpLink({
    uri: API_URL,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client} >
    <div>
      <Component {...pageProps} />
    </div>
  </ApolloProvider>
}