import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import HomePage from "./pages/homepage/HomePage";
import CreatePostPage from "./pages/createPostPage/CreatePostPage";
import PrivateRoute from "./components/privateRouteWrapper/PrivateRoute";
import PostDetailsPage from "./pages/postDetailsPage/PostDetailsPage";
import UserProfilePage from "./pages/userProfilePage/UserProfilePage";
import UserHomePageLayout from "./pages/UserHomePage/UserHomePageLayout";
import UserPostsSection from "./pages/UserHomePage/UserPostsSection";
import UserShareSection from "./pages/UserHomePage/UserShareSection";
import TrendingPage from "./pages/trendingPage/TrendingPage";
import TrendingTagPage from "./pages/trendingTagPage/TrendingTagPage";
import CommunityPage from "./pages/communityPage/CommunityPage";
import CommunityDetailsPage from "./pages/CommunityDetailsPage/CommunityDetailsPage";
import ExplorePage from "./pages/explorePage/ExplorePage";

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
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/trending",
        element: <TrendingPage />,
      },
      {
        path: "/communities",
        element: <CommunityPage />,
      },
      {
        path: "/communities/:id",
        element: <CommunityDetailsPage />,
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
            element: <UserPostsSection />,
          },
          {
            path: "/:username/blog/shares",
            element: <UserShareSection />,
          },
        ],
      },
      {
        path: "/me/profile",
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/me/write",
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
