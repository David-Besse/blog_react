import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./article.css";

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

async function deletePost(postId) {
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
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Suppression effectuée !");
  } catch (error) {
    alert("Suppression echouée !");
    console.error("Error deleting blog post:", error);
    throw error;
  }
}

const Article = () => {
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

  const handleEdit = (post) => {
    if (!post) {
      throw new Error("post is required");
    }

    navigate(`/edit/${post.id}`);
  };

  const handleDelete = async (post) => {
    if (!post) {
      throw new Error("post is required");
    }

    try {
      await deletePost(post.id);
      navigate("/blog");
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <div className="article-content">
      <h1 className="article-title">{post.title}</h1>
      <p className="article-author">
        Auteur : {post.author ? post.author.username : "inconnu"}
      </p>
      <p className="article-author">
        Email : {post.author ? post.author.email : "inconnu"}
      </p>
      <p className="article-date">
        Date :{" "}
        {new Date(post.created_at).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <section className="article-introduction">
        <h2 className="introduction-title">Introduction</h2>
        <p className="introduction-text">{post.content}</p>
        <img
          className="article-image"
          src={post.image_url}
          alt="Image de l'article"
        />
      </section>
      <div className="button-container">
        <button className="edit-button" onClick={() => handleEdit(post)}>
          Modifier
        </button>
        <button className="delete-button" onClick={() => handleDelete(post)}>
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Article;

