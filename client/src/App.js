import TopBar from "./components/TopBar/TopBar";
import CreatePost from "./pages/CreatePost/CreatePost";
import Home from "./pages/Home/Home";
import SinglePost from "./pages/SinglePost/SinglePost";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Protected from "./components/Protected/Protected";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateCategory from "./pages/Category/CreateCategory";
import PostEdit from "./pages/PostEdit/PostEdit";
import './App.css';
import verifyCurrentUser from "./utilies/verifyCurrentUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./services/reducer";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Layout from "./pages/Layout/Layout";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <SinglePost />,
      },
      {
        path: "/create-post",
        element: <Protected><CreatePost /></Protected>,
      },
      {
        path: "/post/edit/:id",
        element: <Protected><PostEdit /></Protected>,
      },
      {
        path: "/create-category",
        element: <Protected><CreateCategory /></Protected>,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  const dispatch =useDispatch();
  const currentUser = verifyCurrentUser();
  useEffect(() => {
    dispatch(setCurrentUser(currentUser));
  }, [currentUser]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
