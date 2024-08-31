import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import HomePage from "./pages/homepage/HomePage";
import UserPage from "./pages/userPage/UserPage";
import CreatePostPage from "./pages/createPostPage/CreatePostPage";
import GameHomePage from "./game/GameHomePage";
import PrivateRoute from "./components/privateRouteWrapper/PrivateRoute";
import PostDetailsPage from "./pages/postDetailsPage/PostDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/game",
        element: <GameHomePage />,
      },
      {
        path: "/:username/blog",
        element: <UserPage />,
      },
      {
        path: "/:username/write",
        element: (
          <PrivateRoute>
            <CreatePostPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/post/:id",
        element: <PostDetailsPage />, // Add your PostPage component here
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
