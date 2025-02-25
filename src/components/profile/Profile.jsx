import "./profil.css";
import updateProfil from "../../api/updateProfil";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("blog_user"));
  const { username, email, createdAt } = user;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const currentPassword = formData.get("old-password");
    const newPassword = formData.get("new-password");

    try {
      await updateProfil(currentPassword, newPassword);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="profile">
      <h1>Profil</h1>
      <p>
        Username: <span id="username">{username}</span>
      </p>
      <p>
        Email: <span id="email">{email}</span>
      </p>
      <p>
        Created At:{" "}
        <span id="created-at">
          {new Date(createdAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </p>

      <form id="edit-form" onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="old-password">Ancien mot de passe :</label>
        <input
          type="password"
          id="old-password"
          name="old-password"
          autoComplete="current-password"
          placeholder="Ancien mot de passe"
        />

        <label htmlFor="new-password">Nouveau mot de passe :</label>
        <input
          type="password"
          id="new-password"
          name="new-password"
          placeholder="Nouveau mot de passe"
          autoComplete="new-password"
        />

        <label htmlFor="confirm-password">
          Confirmer le nouveau mot de passe :
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
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
