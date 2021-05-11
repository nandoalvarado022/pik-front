import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import fetch from "node-fetch";
import { createHttpLink } from "apollo-link-http"
import { ApolloProvider } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { AppContextProvider } from "../contexts/context"
import TagManager from 'react-gtm-module'
import VARS from "../lib/variables"

// CSS/SCSS
import "../styles/globalStyles.scss"
import "../styles/articlesList.scss"
import "react-image-gallery/styles/css/image-gallery.css"

const httpLink = createHttpLink({
  uri: VARS.API_URL_GRAPHQL,
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

export default function MyApp(props) {
  const { Component, pageProps, router } = props
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    TagManager.initialize({ gtmId: 'GTM-5WB6P7C' })
  }, []);

  return <AppContextProvider>
    <ApolloProvider client={client} >
      <Component {...pageProps} key={router.name} />
    </ApolloProvider>
  </AppContextProvider>
}