import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getPosts from "../../api/getPosts";

import "./blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        setPosts([]);
      }
    };
    fetchPost();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section id="blog">
      <button id="createPostButton" onClick={() => navigate("/create-post")}>
        Créer un nouvel article
      </button>
      <div className="blog-container">
        <h1>ARTICLES</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <span>
                <a href={`/article/${post.id}`}>Lire la suite</a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blog;
