import "./login.css";

const LoginPage = () => {

  async function handleSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);
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

      const { access_token } = await response.json();

      localStorage.setItem("blog_access_token", access_token);

      alert("Login successful!");
      window.location.href = "/blog";
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="login">
      <form onSubmit={(evt) => handleSubmit(evt)}>
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
