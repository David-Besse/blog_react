import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./edit-post.css";

async function getPost(postId) {
  if (!postId) {
    throw new Error("postId is required");
  }

  const url = `http://localhost:8001/api/posts/${postId}`;
  const accessToken = localStorage.getItem("blog_access_token");

  if (!accessToken) {
    throw new Error("Access token is required");
  }

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
    return data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
}

async function updatePost(evt, postId) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const token = localStorage.getItem("blog_access_token");
  const apiUrl = `http://localhost:8001/api/posts/${postId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.get("post-title"),
        content: formData.get("post-content"),
        image_url: formData.get("post-image-url"),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Post updated successfully!");
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

const EditPostForm = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(postId);
        setPost(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchPost();
  }, [postId]);

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  if (!post) {
    return <div>Chargement...</div>;
  }

  const handleSubmit = async (evt) => {
    if (!post) {
      throw new Error("post is required");
    }
    try {
      await updatePost(evt, post.id);
      navigate("/blog");
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <div className="edit-post">
      <h1>Edit a Post</h1>
      <form id="edit-post-form" onSubmit={(evt) => handleSubmit(evt)}>
        <label htmlFor="post-title">Title:</label>
        <input
          type="text"
          id="post-title"
          name="post-title"
          defaultValue={post.title}
          required
        />

        <label htmlFor="post-content">Content:</label>
        <textarea
          id="post-content"
          name="post-content"
          defaultValue={post.content}
          required
        ></textarea>

        <label htmlFor="post-image-url">Image URL:</label>
        <input
          type="text"
          id="post-image-url"
          name="post-image-url"
          defaultValue={post.image_url}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPostForm;
