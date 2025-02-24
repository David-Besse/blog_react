import { useState, useEffect } from "react";

import "./blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const url = "http://localhost:8001/api/posts";
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error("Error fetching blog posts:", err);
        setLoading(false);
        setPosts([]);
      }
    }

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section id="blog">
      <button id="createPostButton">Créer un nouvel article</button>
      <div className="blog-container">
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* Add more post details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blog;
