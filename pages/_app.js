import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import fetch from "node-fetch";
import { createHttpLink } from "apollo-link-http"
import { ApolloProvider } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { AppContextProvider } from "../contexts/context"

import "../styles/styles.scss"
import "react-image-gallery/styles/css/image-gallery.css"

// const API_URL = "https://pik-server.herokuapp.com/graphql/"
const API_URL = "http://localhost:3000/graphql/"

const httpLink = createHttpLink({
  uri: API_URL,
  fetch: fetch,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default function MyApp({ Component, pageProps }) {
  return <AppContextProvider>
    <ApolloProvider client={client} >
      <div>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  </AppContextProvider>
}