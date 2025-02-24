import "./create-post.css";

const CreatePostForm = () => {
  return (
    <div className="create-post">
      <h2>Create a new post</h2>
      <form id="postForm">
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" required />
        </label>

        <label htmlFor="content">
          Content
          <textarea id="content" name="content" required />
        </label>

        <label htmlFor="imageUrl">
          Image URL
          <input type="text" id="imageUrl" name="imageUrl" />
        </label>

        <button type="submit">Create post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
