import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostEdit({ posts, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find(w => w.id === parseInt(id));

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (!post) {
    return <p>존재하지 않는 게시글은 수정할 수 없습니다.</p>;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }
    onUpdate(post.id, title, content);
  };

  return (
    <div>
      <h2>글 수정하기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows="10" />
        </div>
        <button type="submit">수정 완료</button>
        <button type="button" onClick={() => navigate(`/posts/${post.id}`)}>
          취소
        </button>
      </form>
    </div>
  );
}

export default PostEdit;
