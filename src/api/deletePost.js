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

export default deletePost;
