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

export default getPost;
