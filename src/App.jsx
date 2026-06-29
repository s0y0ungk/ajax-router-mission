import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import PostNew from "./pages/PostNew";


function App() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    // let alive = true; //상품조회 시작..열일중...
    const controller = new AbortController();


    async function fetchData() {
      try {
        const res = await fetch("/data/blog.json", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("메시지");
        const data = await res.json();
        setPosts(data);
      } catch (e) {
        console.error(e);
        setPosts([]); //에러시 목록 비움
      } finally {
        setLoaded(true);
      }
    }
    fetchData();


    return () => {
      // alive = false;
      controller.abort();
    }; //정리함수
  }, []);


  const onDelete = _id => {
    setPosts(prev => prev.filter(post => post.id !== _id));
  };
  const newId = useMemo(() => {
    const maxId = posts.reduce((acc, current) => {
      return Math.max(acc, current.id);
    }, 0);
    return maxId + 1;
  }, [posts]);


  const onCreate = ({ _title, _content }) => {
    const newPost = { title: _title, content: _content, id: newId, createAt: 새날짜 };
    setPosts(prev => [...prev, newPost]);
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout loaded={loaded} />}>
          <Route index element={<Home posts={posts} />} />
          <Route path="posts" element={<Posts posts={posts} />} />
          <Route path="post/:id" element={<PostDetail posts={posts} onDelete={onDelete} />} />
          <Route path="posts/new" element={<PostNew onCreate={onCreate} />} />


          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;
