import { Routes, Route } from "react-router-dom";
import HomePage from "../homePage/HomePage";
import Blog from "../blog/Blog";
import Article from "../article/Article";
import Error from "../error/Error";
import LoginPage from "../loginPage/LoginPage";
import Profile from "../profile/Profile";
import Register from "../registerForm/RegisterForm";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import EditPostForm from "../editPostForm/EditPostForm";
import CreatePostForm from "../createPostForm/CreatePostForm";

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