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

export default updatePost;
