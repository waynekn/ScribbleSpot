import { createBrowserRouter } from "react-router-dom";

import NavBar from "./routes/navigation/navigation.component";
import AboutUs from "./components/about-us/about-us.component";
import Article from "./components/article/article.component";
import AuthStatus from "./utils/auth-status.util";
import SignInForm from "./components/sign-in/sign-in-form.component";
import SignUpForm from "./components/sign-up/sign-up-form.component";
import Editor from "./components/editor/editor.component";
import SettingsForm from "./components/settings-form/settings-form.component";
import ProfilePage from "./components/profile/profile.component";
import ArticlePreview from "./components/article-preview/article-preview.component";
import Home from "./routes/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "about-us",
    element: <AboutUs />,
  },
  {
    path: "authentication/sign-in",
    element: <SignInForm />,
  },
  {
    path: "authentication/sign-up",
    element: <SignUpForm />,
  },
  {
    path: "authentication/:status",
    element: <AuthStatus />,
  },
  {
    path: "stories",
    element: <Article />,
  },
  {
    path: "profile/:displayName",
    element: <ProfilePage />,
    children: [
      { path: "settings", element: <SettingsForm /> },
      { path: "posts", element: <ArticlePreview /> },
    ],
  },
  { path: "editor", element: <Editor /> },
  {
    path: "settings",
    element: <SettingsForm />,
  },
]);
