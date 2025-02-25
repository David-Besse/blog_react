import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Blog from "./Blog";
import Article from "./Article";
import Error from "./Error";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import Register from "./RegisterForm";
import Header from "./Header";
import Footer from "./Footer";
import EditPostForm from "./EditPostForm";
import CreatePostForm from "./CreatePostForm";

const App = () => {
  return (
    <>
      <Header />
      <main id="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:postId" element={<Article />} />
          <Route path="/edit/:postId" element={<EditPostForm />} />
          <Route path="/create-post" element={<CreatePostForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;