async function getPosts() {
  const apiUrl = "http://localhost:8001/api/posts";
  const token = localStorage.getItem("blog_access_token");

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();
    posts.sort((a, b) => a.id - b.id);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export default getPosts;
