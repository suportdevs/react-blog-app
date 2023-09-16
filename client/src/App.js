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
const router = createBrowserRouter([
  {
    path: "/",
    element: <TopBar />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "post/:id",
        element: <SinglePost />,
      },
      {
        path: "create-post",
        element: <Protected><CreatePost /></Protected>,
      },
      {
        path: "post/edit/:id",
        element: <Protected><PostEdit /></Protected>,
      },
      {
        path: "create-category",
        element: <Protected><CreateCategory /></Protected>,
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
  {
    path: '/contact',
    element: <CreatePost />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
    // <Router>
    //   <TopBar/>
    // <Routes>
    //   <Protected>
    //   <Route exact path="/" element={<Home />} />
    //   </Protected>
    //     <Route path="/post/:id" element={<SinglePost />} />
    //     <Route path="/create-post" element={<CreatePost />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    // </Routes>
    // </Router>
  );
}

export default App;
