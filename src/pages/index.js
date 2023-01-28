import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

const QUERY = gql`
  query Query {
    getPosts {
      id
      title
      body
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
            <li key={post.id}>
              <Link href={`${post.id}`}>
              {post.title}
              </Link>
            </li>
          ))}
        </ol>
    </>
  );
}