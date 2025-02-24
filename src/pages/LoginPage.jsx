import "./login.css";

const LoginPage = () => {

  async function submit(evt) {
    evt.preventDefault();
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    try {
      const response = await fetch("http://localhost:8001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Connexion echouée !",
          text: "Email ou mot de passe incorrect",
          showConfirmButton: false,
          timer: 1500,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data) {
        accessToken = data.access_token;
        localStorage.setItem("accessToken", accessToken);
        console.log("accessToken:", accessToken);
  
        Swal.fire({
          icon: "success",
          title: "Connexion réussie !",
          text: "Vous êtes maintenant connecté !",
          showConfirmButton: false,
          timer: 1500,
        });
  
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  return (
    <div className="login">
      <form onSubmit={(evt) => submit(evt)}>
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
