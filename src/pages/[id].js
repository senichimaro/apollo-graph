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