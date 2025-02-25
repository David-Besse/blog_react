import fetchCurrentUser from "../../api/fetchCurrentUser";

import "./login.css";

const LoginPage = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:8001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { access_token: token } = await response.json();
      localStorage.setItem("blog_access_token", token);

      const user = await fetchCurrentUser(token);
      localStorage.setItem("blog_user", JSON.stringify(user));

      localStorage.setItem("blog_user_isActive", true);

      window.location.replace("/blog");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email@msn.com"
          name="email"
          autoComplete="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          name="password"
          autoComplete="current-password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
