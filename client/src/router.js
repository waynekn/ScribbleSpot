import { createBrowserRouter } from "react-router-dom";
import NavBar from "./routes/Navigation/navigation.component";
import AboutUs from "./components/about-us/about-us.component";
import Article from "./components/article/read.component";
import Editor from "./routes/editor/editor.component";
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
    path: "stories",
    element: <Article />,
  },
  {
    path: "write",
    element: <Editor />,
  },
]);
