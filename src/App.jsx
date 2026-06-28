import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import PostNew from "./pages/PostNew";
import PostEdit from "./pages/PostEdit";
import NotFound from "./pages/NotFound";

function App() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  // 4단계: 데이터 로딩
  useEffect(() => {
    let isAlive = true;

    fetch("/data/blog.json")
      .then(res => res.json())
      .then(result => {
        if (isAlive) {
          setPosts(result);
          setLoaded(true); // 로드 완료 시 true 변경
        }
      })
      .catch(err => console.error(err));

    return () => {
      isAlive = false;
    };
  }, []);

  const handleCreate = (_title, _content) => {
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

    const _contents = posts.concat({
      id: newId,
      title: _title,
      content: _content,
      createdAt: new Date().toISOString().split("T")[0],
    });

    setPosts(_contents);
    navigate(`/posts/${newId}`); // 작성 후 상세페이지로 이동
  };

  const handleUpdate = (_id, _title, _content) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === _id
          ? {
              ...p,
              title: _title,
              content: _content,
            }
          : p,
      ),
    );
    navigate(`/posts/${_id}`); // 수정 후 상세페이지로 이동
  };

  const handleDelete = _id => {
    if (window.confirm("정말로 이 글을 삭제하시겠습니까?")) {
      setPosts(prev => prev.filter(item => item.id !== _id));
      navigate("/posts"); // 삭제 후 목록으로 이동
    }
  };
  

  return (
    <Routes>
      <Route path="/" element={<Layout loaded={loaded} />}>
        <Route index element={<Home posts={posts} />} />
        <Route path="posts" element={<Posts posts={posts} />} />
        <Route path="posts/new" element={<PostNew onCreate={handleCreate} />} />
        <Route path="posts/:id" element={<PostDetail posts={posts} onDelete={handleDelete} />} />
        <Route path="posts/:id/edit" element={<PostEdit posts={posts} onUpdate={handleUpdate} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
