import "./profil.css";

const Profile = () => {
  return (
    <div className="profile">
      <h1>Profil</h1>
      <p>
        Username: <span id="username"></span>
      </p>
      <p>
        Email: <span id="email"></span>
      </p>
      <p>
        Created At: <span id="created_at"></span>
      </p>

      <form id="edit-form">
        <label htmlFor="oldPassword">Ancien mot de passe :</label>
        <input
          type="password"
          id="oldPassword"
          placeholder="Ancien mot de passe"
          autoComplete="current-password"
        />

        <label htmlFor="newPassword">Nouveau mot de passe :</label>
        <input
          type="password"
          id="newPassword"
          placeholder="Nouveau mot de passe"
          autoComplete="new-password"
        />

        <label htmlFor="confirmPassword">
          Confirmer le nouveau mot de passe :
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirmer le nouveau mot de passe"
          autoComplete="new-password"
        />

        <button type="submit" id="update-button">
          Valider
        </button>
      </form>

      <button id="logout-button">Déconnexion</button>
    </div>
  );
};

export default Profile;
