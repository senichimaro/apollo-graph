# Implement Apollo Client

Apollo in the client side, use the Context API for state management and follows a similar pattern.

It uses its built-in hook and variables holding GraphQL queries to request for data. In the meantime, It handles the loading and error states. Finally, returns the data or an error message.

One of the great features of Apollo is that It solves the N+1 problem, what It does through its InMemoryCache object.

Create an Apollo Client in three steps:

1. Set up the Client
2. Create the GraphQL query
3. Implement the useQuery hook

## Packages 

1. core: graphql
2. utils: @apollo/client
      1. Apollo React Hook
      2. Local State Manager
      3. In memory Cache
      4. Error Handling

```bash
npm i graphql @apollo/client
```

## 1. Set up the Client

The basic idea is wrap the whole in a component which saves, retrieves and makes data shareable. This wrapper provides a context where the data is available.

Apollo implements that idea plus a cache and the target URL of the server to be queried. The Cache pairs requests and stored data avoiding unnecessary requests.

```js
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
```
