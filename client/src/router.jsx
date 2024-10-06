import { createBrowserRouter } from "react-router-dom";

import NavBar from "./routes/navigation/navigation.component";
import Blog from "./components/blog/blog.component";
import AuthStatus from "./utils/auth-status.util";
import SignInForm from "./components/sign-in/sign-in-form.component";
import SignUpForm from "./components/sign-up/sign-up-form.component";
import Editor from "./components/editor/editor.component";
import SettingsForm from "./components/settings-form/settings-form.component";
import ProfilePage from "./components/profile/profile.component";
import BlogPreview from "./components/blog-preview/blog-preview.component";
import LikesPreview from "./components/likes/likes-preview.component";
import Home from "./routes/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [{ index: true, element: <Home /> }],
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
    path: "profile/:userName",
    element: <ProfilePage />,
    children: [
      { index: true, element: <BlogPreview index={true} /> },
      { path: "settings", element: <SettingsForm /> },
      {
        path: "posts",
        element: <BlogPreview index={false} />,
      },
      {
        path: "likes",
        element: <LikesPreview />,
      },
    ],
  },
  { path: "blog/:titleSlug/:blogId", element: <Blog /> },
  { path: "editor", element: <Editor /> },
  {
    path: "settings",
    element: <SettingsForm />,
  },
]);
