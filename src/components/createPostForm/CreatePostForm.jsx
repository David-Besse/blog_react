import { useNavigate } from "react-router-dom";

import "./create-post.css";

async function createPost(event) {
  event.preventDefault();

  const dataForm = new FormData(event.target);

  const accessToken = localStorage.getItem("blog_access_token");

  const user = JSON.parse(localStorage.getItem("blog_user"));

  const url = "http://localhost:8001/api/posts";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: dataForm.get("newtitle"),
        content: dataForm.get("newcontent"),
        image_url:
          dataForm.get("newimage") === "" ? "*" : dataForm.get("newimage"),
        user_id: parseInt(user.id),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Article créé !");
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
  }
}

const CreatePostForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createPost(event);
      navigate("/blog");
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <div className="create-post">
      <h2>Création d&apos;un nouvel article</h2>
      <form id="postForm" onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="newtitle">Title</label>
        <input type="text" id="newtitle" name="newtitle" required />

        <label htmlFor="newcontent">Content</label>
        <textarea id="newcontent" name="newcontent" required />

        <label htmlFor="newimage">Image URL</label>
        <input type="text" id="newimage" name="newimage" />

        <button type="submit">Valider l&apos;article</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
