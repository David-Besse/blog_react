async function registerUser(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const url = "http://localhost:8001/api/auth/register";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const res = await response.json();
    alert(`Status: ${response.status}\nMessage: ${res.detail}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export default registerUser;
