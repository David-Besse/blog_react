import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getPost from "../../api/getPostByPostId";
import updatePost from "../../api/updatePost";

import "./edit-post.css";

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
