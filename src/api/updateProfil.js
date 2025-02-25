async function updateProfil(oldpwd, newpwd) {
  const url = "http://localhost:8001/api/auth/update-password";
  const accessToken = localStorage.getItem("blog_access_token");

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        old_password: oldpwd,
        new_password: newpwd,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Modification effectuée !");
  } catch (error) {
    alert("Modification echouée !");
    console.error("Error updating password:", error);
    throw error;
  }
}

export default updateProfil;
