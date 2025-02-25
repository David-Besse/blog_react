async function fetchCurrentUser(token) {
  const response = await fetch("http://localhost:8001/api/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await response.json();

  if (!response.ok || !user) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return user;
}

export default fetchCurrentUser;