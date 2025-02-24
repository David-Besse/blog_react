import "./edit-post.css";

const EditPostForm = () => {
  return (
    <div className="edit-post">
      <h1>Edit a Post</h1>
      <form id="edit-post-form">
        <label htmlFor="post-title">Title:</label>
        <input type="text" id="post-title" name="post-title" required />

        <label htmlFor="post-content">Content:</label>
        <textarea id="post-content" name="post-content" required></textarea>

        <label htmlFor="post-image-url">Image URL:</label>
        <input type="text" id="post-image-url" name="post-image-url" />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPostForm;
