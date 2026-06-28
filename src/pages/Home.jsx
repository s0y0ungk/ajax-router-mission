import { Link } from "react-router-dom";

function Home({ posts }) {
  const recentPosts = posts.slice(0, 3);

  return (
    <section>
      <h2>소개</h2>
      <p>React Router로 목록/상세/작성/수정/삭제를 연습하는 미션입니다.</p>
      <h3>최신 글</h3>

      {recentPosts.length === 0 ? (
        <p>글이 없습니다.</p>
      ) : (
        <ul>
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link> ({post.createdAt})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Home;