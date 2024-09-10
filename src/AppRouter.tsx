import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import HomePage from "./pages/homepage/HomePage";
import CreatePostPage from "./pages/createPostPage/CreatePostPage";
import GameHomePage from "./game/GameHomePage";
import PrivateRoute from "./components/privateRouteWrapper/PrivateRoute";
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import PostDetailsPage from "./pages/postDetailsPage/PostDetailsPage";
import UserProfilePage from "./pages/userProfilePage/UserProfilePage";
import UserHomePageLayout from "./pages/UserHomePage/UserHomePageLayout";
import UserPostsSection from "./pages/UserHomePage/UserPostsSection";
import UserShareSection from "./pages/UserHomePage/UserShareSection";
import TrendingPage from "./pages/trendingPage/TrendingPage";
import TrendingTagPage from "./pages/trendingTagPage/TrendingTagPage";

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
        path: "/trending",
        element: <TrendingPage />,
      },
      {
        path: "/trending/:tag",
        element: <TrendingTagPage />,
      },
      {
        path: "/post/:id",
        element: <PostDetailsPage />, // Add your PostPage component here
      },
      {
        path: "/:username/blog",
        // element: <UserHomePage />,
        element: <UserHomePageLayout />,
        children: [
          {
            path: "/:username/blog",
            element: <UserPostsSection/>
          },
          {
            path: "/:username/blog/shares",
            element: <UserShareSection/>
          }
        ]
      },
      {
        path: "/:username/profile",
        element: <UserProfilePage />,
      },
      {
        path: "/:username/write",
        element: (
          <PrivateRoute>
            <CreatePostPage />
          </PrivateRoute>
        ),
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
