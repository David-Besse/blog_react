import "./register.css";

const RegisterForm = () => {
  return (
    <form className="register-form">
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
        placeholder="email@msn.com"
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
