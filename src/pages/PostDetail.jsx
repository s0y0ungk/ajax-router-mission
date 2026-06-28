import { useParams, Link } from "react-router-dom";

function PostDetail({ posts, onDelete }) {
  const { id } = useParams();
  
  // Array.find로 게시글 탐색
  const post = posts.find(w => w.id === parseInt(id));

  // 게시글이 없을 때 예외 처리
  if (!post) {
    return (
      <div>
        <h3>존재하지 않는 게시글입니다.</h3>
        <Link to="/posts">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성일: {post.createdAt}</p>
      
      <div>{post.content}</div>
      
      <div>
        <Link to={`/posts/${post.id}/edit`}>
          <button>수정</button>
        </Link>
        <button onClick={() => onDelete(post.id)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default PostDetail;