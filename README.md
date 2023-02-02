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

## 2 and 3. Create the GraphQL query and Implement the useQuery hook

The GraphQL query is created into a variable. Introduced then into the useQuery hook, which provides the data, error and loading objects to handle the process of querying.

```js
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Query {
    getPosts {
      id
      title
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(QUERY);
  if (loading) return <p>loading...</p>;
  if (error) return <p>...error :(</p>;
  return (
    <>Posts
        <ol>
          {data.getPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ol>
    </>
  );
}
```

## Extra: Implementation of getPost(id: Int)

* Required changes: Change the "id" related fields in the server Schema from "ID" to "Int".

Dynamic Queries use variables, so the query should implement this variable and give it a value. This type of query use the same useQuery hook with an extra object with a "variables" key which should match the variable name.

```js
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const GET_POST_BY_ID = gql`
  query Query($getPostId: Int) {
    getPost(id: $getPostId) {
      id
      title
      body
    }
  }
`;

export default function Post() {
  const router = useRouter();
  return Object.keys(router.query).length ? <Page getPostId={router.query.id} /> : "Loading..."
}

const Page = ({ getPostId }) => {
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: { getPostId: parseInt(getPostId) },
  });
  if (loading) return "Querying...";
  if (error) return "Error...";
  return (
    <ul>
      <li>ID: {data.getPost.id}</li>
      <li>Title: {data.getPost.title}</li>
      <li>Body: {data.getPost.body}</li>
    </ul>
  );
};
```

---

# Run from Docker

* Server puzzledotscode/poc_client
