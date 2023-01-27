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