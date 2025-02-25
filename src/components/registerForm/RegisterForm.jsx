import { useNavigate } from "react-router-dom";
import registerUser from "../../api/registerUser";

import "./register.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await registerUser(event);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form className="register-form" onSubmit={(event) => handleSubmit(event)}>
      <label>Nom d&apos;utilisateur</label>
      <input
        type="text"
        id="username"
        placeholder="nom_utilisateur"
        name="username"
        autoComplete="username"
        required
      />
      <label>Email</label>
      <input
        type="email"
        id="email"
        placeholder="email@domain"
        name="email"
        autoComplete="email"
        required
      />
      <label>Mot de passe</label>
      <input
        type="password"
        id="password"
        placeholder="********"
        name="password"
        autoComplete="current-password"
        required
      />
      <button type="submit">S&apos;inscrire</button>
    </form>
  );
};

export default RegisterForm;
